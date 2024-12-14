package service

import (
	"a21hc3NpZ25tZW50/model"
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"time"
)

type HTTPClient interface {
	Do(req *http.Request) (*http.Response, error)
}

type AIService struct {
	Client HTTPClient
}

func (s *AIService) AnalyzeData(table map[string][]string, query, token string) (string, error) {
    if len(table) == 0 {
        return "", fmt.Errorf("data table kosong")
    }

    requestBody, err := json.Marshal(model.AIRequest{
        Inputs: model.Inputs{
            Table: table,
            Query: query,
        },
    })
    if err != nil {
        return "", err
    }

    req, err := http.NewRequest("POST", "https://api-inference.huggingface.co/models/google/tapas-large-finetuned-wtq", bytes.NewBuffer(requestBody))
    if err != nil {
        return "", err
    }

    req.Header.Set("Authorization", "Bearer "+token)
    req.Header.Set("Content-Type", "application/json")

    log.Printf("Payload: %s\n", string(requestBody))
    for retries := 0; retries < 3; retries++ {
        resp, err := s.Client.Do(req)
        if err != nil {
            log.Printf("Error making request to Hugging Face API: %v", err)
            continue
        }
        defer resp.Body.Close()

        if resp.StatusCode != http.StatusOK {
            bodyBytes, _ := io.ReadAll(resp.Body)
            return "", fmt.Errorf("failed to get response from AI model: %s", string(bodyBytes))
        }

        var response model.TapasResponse
        if err := json.NewDecoder(resp.Body).Decode(&response); err != nil {
            return "", err
        }

        return response.Answer, nil
    }

    return "", fmt.Errorf("failed to get response from AI model after several retries")
}

func (s *AIService) ChatWithAI(context, query, token string) (model.ChatResponse, error) {
    requestBody, err := json.Marshal(map[string]string{
        "inputs": context + " " + query,
    })
    if err != nil {
        return model.ChatResponse{}, err
    }

    req, err := http.NewRequest("POST", "https://api-inference.huggingface.co/models/microsoft/Phi-3.5-mini-instruct", bytes.NewBuffer(requestBody))
    if err != nil {
        return model.ChatResponse{}, err
    }

    req.Header.Set("Authorization", "Bearer "+token)
    req.Header.Set("Content-Type", "application/json")

    for retries := 0; retries < 3; retries++ {
        resp, err := s.Client.Do(req)
        if err != nil {
            log.Printf("Error making request to Hugging Face API: %v", err)
            time.Sleep(5 * time.Second)
            continue
        }
        defer resp.Body.Close()

        if resp.StatusCode == http.StatusServiceUnavailable {
            log.Printf("Service unavailable, retrying...")
            time.Sleep(5 * time.Second)
            continue
        }

        if resp.StatusCode != http.StatusOK {
            bodyBytes, _ := io.ReadAll(resp.Body)
            return model.ChatResponse{}, fmt.Errorf("failed to get response from AI model: %s", string(bodyBytes))
        }

        var responses []model.ChatResponse
        if err := json.NewDecoder(resp.Body).Decode(&responses); err != nil {
            return model.ChatResponse{}, err
        }

        if len(responses) == 0 {
            return model.ChatResponse{}, fmt.Errorf("no response from AI model")
        }

        return responses[0], nil
    }

    return model.ChatResponse{}, fmt.Errorf("failed to get response from AI model after several retries")
}