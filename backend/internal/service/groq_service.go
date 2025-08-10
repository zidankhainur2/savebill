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
// Kita tetap menerima 'ctx' sebagai parameter untuk best practice,
// meskipun tidak digunakan langsung dalam pemanggilan client.
func (s *GroqService) GenerateChatResponse(ctx context.Context, fileContent, question string) (string, error) {
	if fileContent == "" || question == "" {
		return "", errors.New("file content and question cannot be empty")
	}

	prompt := fmt.Sprintf(`
Berdasarkan data CSV berikut:
---
%s
---
Jawab pertanyaan ini: "%s"

Berikan jawaban yang jelas dan ringkas.
`, fileContent, question)

	// --- PERBAIKAN DI BAWAH INI ---
	resp, err := s.client.CreateChatCompletion(groq.CompletionCreateParams{
		Model: "llama3-8b-8192",
		Messages: []groq.Message{
			{
				Role:    "system",
				Content: "Anda adalah asisten analis data yang membantu menganalisis data dari file CSV.",
			},
			{
				Role:    "user",
				Content: prompt,
			},
		},
		// Perbaikan 2: Hapus simbol '&'
		ResponseFormat: groq.ResponseFormat{Type: "text"},
	})
	// Perbaikan 1: 'ctx' dihapus dari pemanggilan fungsi di atas.

	if err != nil {
		return "", fmt.Errorf("failed to get response from Groq: %w", err)
	}

	if len(resp.Choices) > 0 {
		return resp.Choices[0].Message.Content, nil
	}

	return "Maaf, saya tidak bisa memberikan jawaban saat ini.", nil
}