package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	SupabaseURL        string
	SupabaseServiceKey string
	DatabaseURL        string
	GeminiAPIKey       string
	Port               string
	FrontendURL        string
}

func LoadConfig() *Config {
	if err := godotenv.Load(); err != nil {
		_ = godotenv.Load("../.env")
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	frontendURL := os.Getenv("FRONTEND_URL")
	if frontendURL == "" {
		frontendURL = "http://localhost:3000"
	}

	cfg := &Config{
		SupabaseURL:        os.Getenv("SUPABASE_URL"),
		SupabaseServiceKey: os.Getenv("SUPABASE_SERVICE_KEY"),
		DatabaseURL:        os.Getenv("DATABASE_URL"),
		GeminiAPIKey:       os.Getenv("GEMINI_API_KEY"),
		Port:               port,
		FrontendURL:        frontendURL,
	}

	if cfg.DatabaseURL == "" {
		log.Printf("[CONFIG WARNING] DATABASE_URL is empty! Ensure backend/.env is present.")
	} else {
		log.Printf("[CONFIG OK] Loaded DATABASE_URL successfully.")
	}

	return cfg
}
