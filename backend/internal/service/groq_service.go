package service

import (
	"context"
	"errors"
	"fmt"
	"os"

	"github.com/jpoz/groq"
)

type GroqService struct {
	client *groq.Client
}

func NewGroqService() *GroqService {
	return &GroqService{
		client: groq.NewClient(
			groq.WithAPIKey(os.Getenv("GROQ_API_KEY")),
		),
	}
}

// GenerateChatResponse membuat prompt dan mengirimkannya ke Groq API.
func (s *GroqService) GenerateChatResponse(ctx context.Context, fileContent, question string) (string, error) {
	if fileContent == "" || question == "" {
		return "", errors.New("file content and question cannot be empty")
	}

	// Prompt pengguna tetap sederhana
	prompt := fmt.Sprintf(`
Data CSV untuk dianalisis:
---
%s
---

Pertanyaan dari pengguna: "%s"
`, fileContent, question)

	// Inilah 'otak' dari AI kita. Instruksinya sekarang jauh lebih detail.
	systemMessage := `Anda adalah "AI Analyst", seorang asisten analis data yang sangat ahli, ramah, dan komunikatif.

### ATURAN UTAMA:
1.  **BAHASA**: Ini adalah aturan paling penting. **WAJIB** balas dalam bahasa yang **SAMA** dengan bahasa yang digunakan dalam "Pertanyaan dari pengguna". Jangan pernah menggunakan bahasa lain. Jika pertanyaan dalam Bahasa Indonesia, balas 100% dalam Bahasa Indonesia.
2.  **FORMAT**: Selalu gunakan format **Markdown** untuk membuat jawabanmu rapi dan mudah dibaca. Gunakan headings, bold, dan bullet points.
3.  **TONE**: Jadilah seperti asisten yang membantu. Mulailah dengan sapaan ramah, berikan jawaban, lalu tutup dengan kalimat yang suportif.

### CONTOH STRUKTUR JAWABAN:

Tentu, ini analisis saya berdasarkan data yang Anda berikan.

**[Judul Analisis yang Relevan]**

Berdasarkan data CSV, jawaban untuk pertanyaan Anda adalah [jawaban langsung].

Berikut adalah beberapa detail atau poin pendukung:
* **Poin Penting 1**: [Penjelasan untuk poin 1].
* **Poin Penting 2**: [Penjelasan untuk poin 2].
* **Poin Penting 3**: [Penjelasan untuk poin 3].

Semoga analisis ini membantu! Jika ada pertanyaan lain, jangan ragu untuk bertanya.
`

	resp, err := s.client.CreateChatCompletion(
		groq.CompletionCreateParams{
			Model: "llama-3.1-8b-instant", 
			Messages: []groq.Message{
				{
					Role:    "system",
					Content: systemMessage,
				},
				{
					Role:    "user",
					Content: prompt,
				},
			},
			ResponseFormat: groq.ResponseFormat{Type: "text"},
		},
	)

	if err != nil {
		return "", fmt.Errorf("failed to get response from Groq: %w", err)
	}

	if len(resp.Choices) > 0 {
		return resp.Choices[0].Message.Content, nil
	}

	return "Maaf, saya tidak bisa memberikan jawaban saat ini.", nil
}