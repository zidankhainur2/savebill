package main

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"

	"a21hc3NpZ25tZW50/service"

	"github.com/gorilla/mux"
	"github.com/gorilla/sessions"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

var fileService = &service.FileService{}
var aiService = &service.AIService{Client: &http.Client{}}
var store = sessions.NewCookieStore([]byte("my-key"))

func getSession(r *http.Request) *sessions.Session {
	session, _ := store.Get(r, "chat-session")
	return session
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	token := os.Getenv("HUGGINGFACE_TOKEN")
	if token == "" {
		log.Fatal("HUGGINGFACE_TOKEN is not set in the .env file")
	}

	router := mux.NewRouter()

	// File upload endpoint
	router.HandleFunc("/upload", handleFileUpload).Methods("POST")

	// Chat endpoint
	router.HandleFunc("/chat", handleChat).Methods("POST")

	corsHandler := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"Content-Type", "Authorization"},
	}).Handler(router)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Server running on port %s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, corsHandler))
}

func handleFileUpload(w http.ResponseWriter, r *http.Request) {
	err := r.ParseMultipartForm(10 << 20)
	if err != nil {
		http.Error(w, "Unable to parse form: "+err.Error(), http.StatusBadRequest)
		return
	}

	file, _, err := r.FormFile("file")
	if err != nil {
		http.Error(w, "Unable to retrieve file: "+err.Error(), http.StatusBadRequest)
		return
	}
	defer file.Close()

	fileContent, err := io.ReadAll(file)
	if err != nil {
		http.Error(w, "Unable to read file: "+err.Error(), http.StatusInternalServerError)
		return
	}

	query := r.FormValue("query")
	if query == "" {
		http.Error(w, "Query is required", http.StatusBadRequest)
		return
	}

	processedData, err := fileService.ProcessFile(string(fileContent))
	if err != nil {
		http.Error(w, "Failed to process file: "+err.Error(), http.StatusInternalServerError)
		return
	}

	analysisResult, err := aiService.AnalyzeData(processedData, query, os.Getenv("HUGGINGFACE_TOKEN"))
	if err != nil {
		http.Error(w, "Failed to analyze data: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "success", "answer": analysisResult})
}

func handleChat(w http.ResponseWriter, r *http.Request) {
	var requestBody struct {
		Query string `json:"query"`
	}
	if err := json.NewDecoder(r.Body).Decode(&requestBody); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	session := getSession(r)
	context, _ := session.Values["context"].(string)

	chatResponse, err := aiService.ChatWithAI(context, requestBody.Query, os.Getenv("HUGGINGFACE_TOKEN"))
	if err != nil {
		http.Error(w, "Failed to chat with AI: "+err.Error(), http.StatusInternalServerError)
		return
	}

	session.Values["context"] = context + "\n" + requestBody.Query + "\n" + chatResponse.GeneratedText
	session.Save(r, w)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "success", "answer": chatResponse.GeneratedText})
}
