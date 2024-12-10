package service

import (
	"a21hc3NpZ25tZW50/model"
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
)

type HTTPClient interface {
	Do(req *http.Request) (*http.Response, error)
}

type AIService struct {
	Client HTTPClient
}

func (s *AIService) AnalyzeData(table map[string][]string, query, token string) (string, error) {
	if table == nil || len(table) == 0 {
		return "", errors.New("table cannot be empty")
	}

	// Persiapkan body request
	requestBody := model.AIRequest{
		Inputs: model.Inputs{
			Table: table,
			Query: query,
		},
	}
	body, err := json.Marshal(requestBody)
	if err != nil {
		return "", err
	}

	// Buat request ke Hugging Face API
	req, err := http.NewRequest("POST", "https://api-inference.huggingface.co/models/google/tapas-base-finetuned-wtq", bytes.NewBuffer(body))
	if err != nil {
		return "", err
	}
	req.Header.Set("Authorization", "Bearer "+token)
	req.Header.Set("Content-Type", "application/json")

	resp, err := s.Client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	// Cek status respons
	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("failed to analyze data, status code: %d", resp.StatusCode)
	}

	// Decode respons JSON
	var tapasResp model.TapasResponse
	err = json.NewDecoder(resp.Body).Decode(&tapasResp)
	if err != nil {
		return "", err
	}

	// Validasi apakah ada jawaban di respons
	if tapasResp.Answer == "" {
		return "", errors.New("no answer found in response")
	}

	return tapasResp.Answer, nil
}

func (s *AIService) ChatWithAI(context, query, token string) (model.ChatResponse, error) {
	// Persiapkan body request
	requestBody := map[string]string{
		"context": context,
		"query":   query,
	}
	body, err := json.Marshal(requestBody)
	if err != nil {
		return model.ChatResponse{}, err
	}

	// Buat request ke Hugging Face API
	req, err := http.NewRequest("POST", "https://api-inference.huggingface.co/models/microsoft/Phi-3.5-mini-instruct", bytes.NewBuffer(body))
	if err != nil {
		return model.ChatResponse{}, err
	}
	req.Header.Set("Authorization", "Bearer "+token)
	req.Header.Set("Content-Type", "application/json")

	resp, err := s.Client.Do(req)
	if err != nil {
		return model.ChatResponse{}, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return model.ChatResponse{}, fmt.Errorf("failed to chat with AI, status code: %d", resp.StatusCode)
	}

	var chatRespArray []model.ChatResponse
	err = json.NewDecoder(resp.Body).Decode(&chatRespArray)
	if err != nil {
		return model.ChatResponse{}, err
	}

	if len(chatRespArray) == 0 {
		return model.ChatResponse{}, errors.New("no response from AI")
	}

	return chatRespArray[0], nil
}
