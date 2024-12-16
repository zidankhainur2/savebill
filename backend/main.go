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
        // Parse form data untuk file dan query
        err := r.ParseMultipartForm(10 << 20) // Maksimum ukuran file 10MB
        if err != nil {
            http.Error(w, "Unable to parse form: "+err.Error(), http.StatusBadRequest)
            return
        }
    
        // Ambil file dari form
        file, _, err := r.FormFile("file")
        if err != nil {
            http.Error(w, "Unable to retrieve file: "+err.Error(), http.StatusBadRequest)
            return
        }
        defer file.Close()
    
        // Baca konten file
        fileContent, err := io.ReadAll(file)
        if err != nil {
            http.Error(w, "Unable to read file: "+err.Error(), http.StatusInternalServerError)
            return
        }
    
        // Ambil query dari form
        query := r.FormValue("query")
        if query == "" {
            http.Error(w, "Query is required", http.StatusBadRequest)
            return
        }
    
        // Proses konten file menggunakan service
        processedData, err := fileService.ProcessFile(string(fileContent))
        if err != nil {
            http.Error(w, "Failed to process file: "+err.Error(), http.StatusInternalServerError)
            return
        }
    
        // Analisis data menggunakan layanan AI
        analysisResult, err := aiService.AnalyzeData(processedData, query, token)
        if err != nil {
            http.Error(w, "Failed to analyze data: "+err.Error(), http.StatusInternalServerError)
            return
        }
    
        // Berikan hasil analisis sebagai respons JSON
        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(map[string]string{
            "status": "success",
            "answer": analysisResult,
        })
    }).Methods("POST")
    

// Chat endpoint
router.HandleFunc("/chat", func(w http.ResponseWriter, r *http.Request) {
    // Parse the request body
    var requestBody struct {
       Query string `json:query`
    }
    if err := json.NewDecoder(r.Body).Decode(&requestBody); err != nil {
        http.Error(w, "Invalid request body", http.StatusBadRequest)
        return
    }

    // Retrieve the chat session context
    session := getSession(r)
    context, _ := session.Values["context"].(string)

    // Perform the chat with AI
    chatResponse, err := aiService.ChatWithAI(context, requestBody.Query, token)
    if err != nil {
        http.Error(w, "Failed to chat with AI: "+err.Error(), http.StatusInternalServerError)
        return
    }

    // Update the chat session context
    session.Values["context"] = context + "\n" + requestBody.Query + "\n" + chatResponse.GeneratedText
    session.Save(r, w)

    // Return the chat response as JSON
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]string{
        "status": "success",
        "answer": chatResponse.GeneratedText,
    })
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