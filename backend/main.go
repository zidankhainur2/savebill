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

// Initialize the services
var fileService = &service.FileService{}
var aiService = &service.AIService{Client: &http.Client{}}
var store = sessions.NewCookieStore([]byte("my-key"))

func getSession(r *http.Request) *sessions.Session {
	session, _ := store.Get(r, "chat-session")
	return session
}

func main() {
	// Load the .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Retrieve the Hugging Face token from the environment variables
	token := os.Getenv("HUGGINGFACE_TOKEN")
	if token == "" {
		log.Fatal("HUGGINGFACE_TOKEN is not set in the .env file")
	}

	// Set up the router
	router := mux.NewRouter()

	// File upload endpoint
	router.HandleFunc("/upload", func(w http.ResponseWriter, r *http.Request) {
		// Baca file dari request
		file, _, err := r.FormFile("file")
		if err != nil {
			http.Error(w, "Invalid file", http.StatusBadRequest)
			return
		}
		defer file.Close()

		// Baca isi file
		fileContent, err := io.ReadAll(file)
		if err != nil {
			http.Error(w, "Error reading file", http.StatusInternalServerError)
			return
		}

		// Proses file
		data, err := fileService.ProcessFile(string(fileContent))
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		// Analisa data
		answer, err := aiService.AnalyzeData(data, "query", token)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Kirim response
		response := map[string]string{"status": "success", "answer": answer}
		json.NewEncoder(w).Encode(response)
	}).Methods("POST")

	// Chat endpoint
	router.HandleFunc("/chat", func(w http.ResponseWriter, r *http.Request) {
		// Baca input dari request
		var input struct {
			Context string `json:"context"`
			Query   string `json:"query"`
		}
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			http.Error(w, "Invalid input", http.StatusBadRequest)
			return
		}

		// Chat dengan AI
		result, err := aiService.ChatWithAI(input.Context, input.Query, token)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Kirim response
		response := map[string]string{"status": "success", "answer": result.GeneratedText}
		json.NewEncoder(w).Encode(response)
	}).Methods("POST")

	// Enable CORS
	corsHandler := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000"}, // Allow your React app's origin
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"Content-Type", "Authorization"},
	}).Handler(router)

	// Start the server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Server running on port %s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, corsHandler))
}