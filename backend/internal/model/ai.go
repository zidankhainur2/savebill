package model

import "time"

type Recommendation struct {
	Title                     string `json:"title"`
	Impact                    string `json:"impact"`
	EstimatedMonthlySavingIDR float64 `json:"estimated_monthly_saving_idr"`
	Description               string `json:"description"`
}

type AIResponse struct {
	MonthlyAssessment         string           `json:"monthly_assessment"`
	EnergyHogAppliance        string           `json:"energy_hog_appliance"`
	ActionableRecommendations []Recommendation `json:"actionable_recommendations"`
}

type AIConsultationLog struct {
	ID            string     `json:"id" db:"id"`
	UserID        string     `json:"user_id" db:"user_id"`
	InputSnapshot string     `json:"input_snapshot" db:"input_snapshot"`
	AIResponse    AIResponse `json:"ai_response" db:"ai_response"`
	CreatedAt     time.Time  `json:"created_at" db:"created_at"`
}
