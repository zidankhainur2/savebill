package service

import (
	"a21hc3NpZ25tZW50/model"
	"bytes"
	"encoding/json"
	"errors"
	"io"
	"net/http"
)

// HTTPClient interface for HTTP requests
type HTTPClient interface {
	Do(req *http.Request) (*http.Response, error)
}

// AIService handles interactions with AI models
type AIService struct {
	Client HTTPClient
}

// AnalyzeData sends a request to the AI endpoint to analyze data based on the query
func (s *AIService) AnalyzeData(table map[string][]string, query, token string) (string, error) {
	if len(table) == 0 {
		return "", errors.New("table is empty")
	}

	requestBody := model.AIRequest{
		Inputs: model.Inputs{
			Table: table,
			Query: query,
		},
	}

	body, err := json.Marshal(requestBody)
	if err != nil {
		return "", wrapError("failed to marshal request body", err)
	}

	req, err := http.NewRequest("POST", "https://api-inference.huggingface.co/models/google/tapas-large-finetuned-wtq", bytes.NewBuffer(body))
	if err != nil {
		return "", wrapError("failed to create HTTP request", err)
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+token)

	resp, err := s.Client.Do(req)
	if err != nil {
		return "", wrapError("failed to send HTTP request", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return "", errors.New("received non-200 response: " + resp.Status)
	}

	responseBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", wrapError("failed to read response body", err)
	}

	var tapasResponse map[string]interface{}
	err = json.Unmarshal(responseBody, &tapasResponse)
	if err != nil {
		return "", wrapError("failed to unmarshal response", err)
	}

	answer, exists := tapasResponse["cells"].([]interface{})
	if !exists || len(answer) == 0 {
		return "", errors.New("no valid answer in the response")
	}

	return answer[0].(string), nil
}

// ChatWithAI sends a chat request to the AI model and returns the response
func (s *AIService) ChatWithAI(context, query, token string) (model.ChatResponse, error) {
	input := context + "\n" + query
	requestBody := map[string]string{"inputs": input}

	body, err := json.Marshal(requestBody)
	if err != nil {
		return model.ChatResponse{}, wrapError("failed to marshal request body", err)
	}

	req, err := http.NewRequest("POST", "https://api-inference.huggingface.co/models/microsoft/Phi-3.5-mini-instruct", bytes.NewBuffer(body))
	if err != nil {
		return model.ChatResponse{}, wrapError("failed to create HTTP request", err)
	}

	req.Header.Set("Authorization", "Bearer "+token)
	req.Header.Set("Content-Type", "application/json")

	resp, err := s.Client.Do(req)
	if err != nil {
		return model.ChatResponse{}, wrapError("failed to send HTTP request", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return model.ChatResponse{}, errors.New("received non-200 response: " + resp.Status)
	}

	responseBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return model.ChatResponse{}, wrapError("failed to read response body", err)
	}

	var chatResponse []map[string]string
	err = json.Unmarshal(responseBody, &chatResponse)
	if err != nil {
		return model.ChatResponse{}, wrapError("failed to unmarshal response", err)
	}

	if len(chatResponse) > 0 {
		return model.ChatResponse{GeneratedText: chatResponse[0]["generated_text"]}, nil
	}

	return model.ChatResponse{}, errors.New("no response from AI")
}

// wrapError adds a context message to the error
func wrapError(message string, err error) error {
	return errors.New(message + ": " + err.Error())
}
