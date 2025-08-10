package handler

import (
	"a21hc3NpZ25tZW50/internal/model"
	"a21hc3NpZ25tZW50/internal/service"
	"encoding/json"
	"net/http"
)

type ChatHandler struct {
	fileSvc *service.FileService
	groqSvc *service.GroqService
}

func NewChatHandler(fileSvc *service.FileService, groqSvc *service.GroqService) *ChatHandler {
	return &ChatHandler{
		fileSvc: fileSvc,
		groqSvc: groqSvc,
	}
}

// respondWithError adalah helper untuk mengirim respons error JSON
func respondWithError(w http.ResponseWriter, code int, message string) {
	respondWithJSON(w, code, map[string]string{"error": message})
}

// respondWithJSON adalah helper untuk mengirim respons JSON
func respondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
	response, _ := json.Marshal(payload)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	w.Write(response)
}

func (h *ChatHandler) HandleChat(w http.ResponseWriter, r *http.Request) {
	var req model.UploadRequest
	
	// Decode request dari frontend
	// Karena frontend mengirim FormData, kita ambil dari FormValue
	fileContent := r.FormValue("fileContent")
	question := r.FormValue("question")

	if fileContent == "" || question == "" {
		respondWithError(w, http.StatusBadRequest, "File content and question are required")
		return
	}
	req.FileContent = fileContent
	req.Question = question


	// 1. Proses (validasi) file
	if err := h.fileSvc.ProcessFile(req.FileContent); err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid file content: "+err.Error())
		return
	}

	// 2. Kirim ke Groq untuk dianalisis
	answer, err := h.groqSvc.GenerateChatResponse(r.Context(), req.FileContent, req.Question)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Failed to generate AI response: "+err.Error())
		return
	}

	// 3. Kirim respons kembali ke frontend
	respondWithJSON(w, http.StatusOK, model.ChatResponse{Answer: answer})
}