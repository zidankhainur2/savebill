package service

import (
	"a21hc3NpZ25tZW50/model"
	"bytes"
	"encoding/json"
	"errors"
	"io"
	"net/http"
)

type HTTPClient interface {
	Do(req *http.Request) (*http.Response, error)
}

type AIService struct {
	Client HTTPClient
}

//  AnalyzeData mengirimkan permintaan ke endpoint AI untuk menganalisis data tabel berdasarkan query.
func (s *AIService) AnalyzeData(table map[string][]string, query, token string) (string, error) {
	// periksa apakah tabel kosong?
    if len(table) == 0 {
        return "", errors.New("table is empty")
    }
// buat request  body sesuai dengan struktur model 
    requestBody := model.AIRequest{
        Inputs: model.Inputs{
            Table: table,
            Query: query,
        },
    }
	//  Marshal request body ke dalam format JSON
    body, err := json.Marshal(requestBody)
    if err != nil {
        return "", errors.New("failed to marshal request body: " + err.Error())
    }
	// Buat HTTP request POST ke endpoint Hugging Face ai model Tapas 
    req, err := http.NewRequest("POST", "https://api-inference.huggingface.co/models/google/tapas-large-finetuned-wtq", bytes.NewBuffer(body))
    if err != nil {
        return "", errors.New("failed to create HTTP request: " + err.Error())
    }
	// tamabahin header untuk Auth dan Content Type 
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Authorization", "Bearer "+token)

	// kirim request menggunkana Http Client 
    resp, err := s.Client.Do(req)
    if err != nil {
        return "", errors.New("failed to send HTTP request: " + err.Error())
    }
    defer resp.Body.Close() 

	// periksa status kode 
    if resp.StatusCode != http.StatusOK {
        return "", errors.New("received non-200 response: " + resp.Status)
    }

	// baca isi respon body 
    responseBody, err := io.ReadAll(resp.Body)
    if err != nil {
        return "", errors.New("failed to read response body: " + err.Error())
    }

	// parse respon JSON ke dalam struktur Map 
    var tapasResponse map[string]interface{}
    err = json.Unmarshal(responseBody, &tapasResponse)
    if err != nil {
        return "", errors.New("failed to unmarshal response: " + err.Error())
    }

    // Update this to match the response body structure
    answer, exists := tapasResponse["cells"].([]interface{})
    if !exists {
        return "", errors.New("no answer found in the response")
    }

    // Assuming the result is a string within the cells array
    if len(answer) > 0 {
        return answer[0].(string), nil
    }
    
    return "", errors.New("no valid answer in the response")
}

//  ChatWithAI mengirimkan permintaan ke model Phi-3.5-mini-instruct di Hugging Face
func (s *AIService) ChatWithAI(context, query, token string) (model.ChatResponse, error) {
	// Gabungkan konteks dan query jika perlu
	input := context + "\n" + query

	// Buat request body
	requestBody := map[string]string{
		"inputs": input,
	}
	body, err := json.Marshal(requestBody)
	if err != nil {
		return model.ChatResponse{}, errors.New("failed to marshal request body: " + err.Error())
	}

	// Buat HTTP request ke endpoint Hugging Face model Microsoft phi 3.5 
	req, err := http.NewRequest("POST", "https://api-inference.huggingface.co/models/microsoft/Phi-3.5-mini-instruct", bytes.NewBuffer(body))
	if err != nil {
		return model.ChatResponse{}, errors.New("failed to create HTTP request: " + err.Error())
	}
	// Tambahkan header untuk Authorization dan Content-Type
	req.Header.Set("Authorization", "Bearer "+token)
	req.Header.Set("Content-Type", "application/json")

	// Kirimkan request menggunakan HTTPClient
	resp, err := s.Client.Do(req)
	if err != nil {
		return model.ChatResponse{}, errors.New("failed to send HTTP request: " + err.Error())
	}
	defer resp.Body.Close()

	// Periksa status kode
	if resp.StatusCode != http.StatusOK {
		return model.ChatResponse{}, errors.New("received non-200 response: " + resp.Status)
	}

	// Baca response body
	responseBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return model.ChatResponse{}, errors.New("failed to read response body: " + err.Error())
	}

	// Parse response yang merupakan array JSON, dan ambil generated_text dari elemen pertama
	var chatResponse []map[string]string
	err = json.Unmarshal(responseBody, &chatResponse)
	if err != nil {
		return model.ChatResponse{}, errors.New("failed to unmarshal response: " + err.Error())
	}

	// Jika response array tidak kosong, ambil generated_text dari elemen pertama
	if len(chatResponse) > 0 {
		return model.ChatResponse{
			GeneratedText: chatResponse[0]["generated_text"],
		}, nil
	}

	return model.ChatResponse{}, errors.New("no response from AI")
}