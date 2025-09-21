package main

import (
	"a21hc3NpZ25tZW50/internal/handler"
	"a21hc3NpZ25tZW50/internal/service"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"runtime"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

func loadEnv() {
	_, b, _, _ := runtime.Caller(0)
	envPath := filepath.Join(filepath.Dir(b), "../../.env")

	// Load .env
	err := godotenv.Load(envPath)
	if err != nil {
		log.Printf("Warning: .env file not found at %s, reading from environment variables\n", envPath)
	} else {
		log.Printf(".env loaded from %s\n", envPath)
	}
}

func main() {
	loadEnv()

	fileService := service.NewFileService()
	groqService := service.NewGroqService()

	chatHandler := handler.NewChatHandler(fileService, groqService)

	r := mux.NewRouter()
	r.HandleFunc("/api/chat", chatHandler.HandleChat).Methods("POST")

	// Setup CORS
	allowedOrigin := os.Getenv("ALLOWED_ORIGIN")
	if allowedOrigin == "" {
    	allowedOrigin = "http://localhost:3000" 
	}

	c := cors.New(cors.Options{
    	AllowedOrigins:   []string{allowedOrigin}, 
    	AllowedMethods:   []string{"POST", "GET", "OPTIONS"},
    	AllowedHeaders:   []string{"Content-Type", "Authorization"},
    	AllowCredentials: true,
	})

	handler := c.Handler(r)

	log.Println("Server starting on port 8080...")
	if err := http.ListenAndServe(":8080", handler); err != nil {
		log.Fatalf("could not start server: %s\n", err)
	}
}
