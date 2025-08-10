package main

import (
	"a21hc3NpZ25tZW50/internal/handler"
	"a21hc3NpZ25tZW50/internal/service"
	"log"
	"net/http"
	"path/filepath"
	"runtime"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

// loadEnv mencari file .env berdasarkan lokasi main.go
func loadEnv() {
	// Ambil path file main.go yang sedang berjalan
	_, b, _, _ := runtime.Caller(0)
	// Naik 2 folder dari lokasi main.go (cmd/api) ke root project
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
	// Muat .env
	loadEnv()

	// Inisialisasi services
	fileService := service.NewFileService()
	groqService := service.NewGroqService()

	// Inisialisasi handlers
	chatHandler := handler.NewChatHandler(fileService, groqService)

	// Router
	r := mux.NewRouter()
	r.HandleFunc("/api/chat", chatHandler.HandleChat).Methods("POST")

	// Middleware CORS
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"}, // Sesuaikan dengan URL frontend
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	handler := c.Handler(r)

	log.Println("Server starting on port 8080...")
	if err := http.ListenAndServe(":8080", handler); err != nil {
		log.Fatalf("could not start server: %s\n", err)
	}
}
