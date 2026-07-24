package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"savebill-api/internal/config"
	"savebill-api/internal/handler"
	"savebill-api/internal/middleware"
	"savebill-api/internal/repository"
	"savebill-api/internal/service"

	"github.com/go-chi/chi/v5"
	chiMiddleware "github.com/go-chi/chi/v5/middleware"
	"github.com/jackc/pgx/v5/pgxpool"
)

func main() {
	cfg := config.LoadConfig()
	log.Printf("Starting SaveBill API on port %s...", cfg.Port)

	var pool *pgxpool.Pool
	if cfg.DatabaseURL != "" {
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()

		p, err := pgxpool.New(ctx, cfg.DatabaseURL)
		if err != nil {
			log.Printf("[DATABASE WARNING] Unable to create connection pool: %v", err)
		} else if err := p.Ping(ctx); err != nil {
			log.Printf("[DATABASE WARNING] Database ping failed: %v", err)
			p.Close()
		} else {
			pool = p
			log.Printf("[DATABASE OK] Connected successfully to PostgreSQL database!")
			defer pool.Close()
		}
	}

	appRepo := repository.NewApplianceRepository(pool)
	calcSvc := service.NewCalculatorService()
	aiSvc := service.NewGeminiService(cfg.GeminiAPIKey, pool)

	appHandler := handler.NewApplianceHandler(appRepo)
	calcHandler := handler.NewCalculateHandler(appRepo, calcSvc)
	aiHandler := handler.NewAIHandler(appRepo, calcSvc, aiSvc)

	authMw := middleware.NewAuthMiddleware(cfg.SupabaseURL)

	r := chi.NewRouter()
	r.Use(chiMiddleware.Logger)
	r.Use(chiMiddleware.Recoverer)
	r.Use(middleware.CORS(cfg.FrontendURL))

	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"status":"ok"}`))
	})

	r.Route("/api/v1", func(r chi.Router) {
		// Public route
		r.Get("/appliances/presets", appHandler.GetPresets)

		// Authenticated routes
		r.Group(func(r chi.Router) {
			r.Use(authMw.RequireAuth)

			r.Get("/appliances", appHandler.GetAppliances)
			r.Post("/appliances", appHandler.CreateAppliance)
			r.Put("/appliances/{id}", appHandler.UpdateAppliance)
			r.Delete("/appliances/{id}", appHandler.DeleteAppliance)

			r.Post("/calculate/summary", calcHandler.CalculateSummary)
			r.Post("/ai/advisor", aiHandler.GetAdvisorRecommendations)
		})
	})

	addr := fmt.Sprintf(":%s", cfg.Port)
	log.Printf("Server listening on http://localhost%s", addr)
	if err := http.ListenAndServe(addr, r); err != nil {
		log.Fatalf("Server error: %v", err)
		os.Exit(1)
	}
}
