package service

import (
	"context"
	"encoding/json"
	"fmt"

	"savebill-api/internal/model"

	"github.com/google/generative-ai-go/genai"
	"github.com/jackc/pgx/v5/pgxpool"
	"google.golang.org/api/option"
)

type GeminiService struct {
	apiKey string
	db     *pgxpool.Pool
}

func NewGeminiService(apiKey string, db *pgxpool.Pool) *GeminiService {
	return &GeminiService{
		apiKey: apiKey,
		db:     db,
	}
}

func (s *GeminiService) GetRecommendations(ctx context.Context, userID string, summary model.Summary) (*model.AIResponse, error) {
	inputBytes, err := json.Marshal(summary)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal input snapshot: %w", err)
	}

	prompt := fmt.Sprintf(`Kamu adalah pakar efisiensi energi rumah tangga Indonesia. Analisis data berikut dan kembalikan HANYA JSON sesuai schema tanpa teks lain.

Input Data:
%s

Required JSON Schema:
{
  "monthly_assessment": "string",
  "energy_hog_appliance": "string",
  "actionable_recommendations": [
    {
      "title": "string",
      "impact": "HIGH | MEDIUM | LOW",
      "estimated_monthly_saving_idr": 0,
      "description": "string"
    }
  ]
}`, string(inputBytes))

	var aiResp model.AIResponse
	if s.apiKey == "" {
		// // ponytail: mock AI response when GEMINI_API_KEY is not set — upgrade when key provided
		aiResp = model.AIResponse{
			MonthlyAssessment:  "Penggunaan listrik Anda cukup efisien, namun perangkat dengan konsumsi terbesar dapat dioptimalkan.",
			EnergyHogAppliance: summary.EnergyHogName,
			ActionableRecommendations: []model.Recommendation{
				{
					Title:                     "Atur Timer pada Perangkat Utama",
					Impact:                    "HIGH",
					EstimatedMonthlySavingIDR: 45000,
					Description:               "Gunakan timer otomatis agar perangkat berdaya tinggi tidak menyala tanpa pengawasan.",
				},
				{
					Title:                     "Gunakan Mode Hemat Energi",
					Impact:                    "MEDIUM",
					EstimatedMonthlySavingIDR: 25000,
					Description:               "Aktifkan mode eco/hemat energi pada perangkat rumah tangga Anda.",
				},
			},
		}
	} else {
		client, err := genai.NewClient(ctx, option.WithAPIKey(s.apiKey))
		if err != nil {
			return nil, fmt.Errorf("failed to create Gemini client: %w", err)
		}
		defer client.Close()

		model := client.GenerativeModel("gemini-3.1-flash-lite")
		model.ResponseMIMEType = "application/json"

		res, err := model.GenerateContent(ctx, genai.Text(prompt))
		if err != nil {
			return nil, fmt.Errorf("Gemini API call failed: %w", err)
		}

		if len(res.Candidates) == 0 || len(res.Candidates[0].Content.Parts) == 0 {
			return nil, fmt.Errorf("empty response from Gemini API")
		}

		respText, ok := res.Candidates[0].Content.Parts[0].(genai.Text)
		if !ok {
			return nil, fmt.Errorf("unexpected content part type from Gemini")
		}

		if err := json.Unmarshal([]byte(respText), &aiResp); err != nil {
			return nil, fmt.Errorf("failed to unmarshal Gemini JSON response: %w", err)
		}
	}

	// Save log to ai_consultation_logs in DB if db connection available
	if s.db != nil {
		respBytes, _ := json.Marshal(aiResp)
		query := `INSERT INTO public.ai_consultation_logs (user_id, input_snapshot, ai_response) VALUES ($1, $2, $3)`
		_, _ = s.db.Exec(ctx, query, userID, string(inputBytes), string(respBytes))
	}

	return &aiResp, nil
}
