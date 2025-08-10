package model

// UploadRequest adalah struktur untuk request unggah file dan pertanyaan.
type UploadRequest struct {
	FileContent string `json:"file_content"`
	Question    string `json:"question"`
}

// ChatResponse adalah struktur untuk respons dari chatbot.
type ChatResponse struct {
	Answer string `json:"answer"`
}