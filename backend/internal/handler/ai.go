package handler

import (
	"net/http"

	"savebill-api/internal/middleware"
	"savebill-api/internal/repository"
	"savebill-api/internal/service"
)

type AIHandler struct {
	appRepo *repository.ApplianceRepository
	calcSvc *service.CalculatorService
	aiSvc   *service.GeminiService
}

func NewAIHandler(appRepo *repository.ApplianceRepository, calcSvc *service.CalculatorService, aiSvc *service.GeminiService) *AIHandler {
	return &AIHandler{
		appRepo: appRepo,
		calcSvc: calcSvc,
		aiSvc:   aiSvc,
	}
}

func (h *AIHandler) GetAdvisorRecommendations(w http.ResponseWriter, r *http.Request) {
	userID, err := middleware.GetUserID(r.Context())
	if err != nil {
		writeError(w, http.StatusUnauthorized, "Unauthorized")
		return
	}

	appliances, err := h.appRepo.FindByUserID(r.Context(), userID)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "Failed to fetch appliances")
		return
	}

	if len(appliances) == 0 {
		writeError(w, http.StatusBadRequest, "Belum ada perangkat. Tambahkan minimal 1 perangkat untuk analisis AI.")
		return
	}

	summary := h.calcSvc.BuildSummary(appliances, 1300)
	aiResp, err := h.aiSvc.GetRecommendations(r.Context(), userID, summary)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "Gagal mendapatkan rekomendasi AI: "+err.Error())
		return
	}

	writeJSON(w, http.StatusOK, aiResp)
}
