package handler

import (
	"encoding/json"
	"net/http"

	"savebill-api/internal/middleware"
	"savebill-api/internal/repository"
	"savebill-api/internal/service"
)

type CalculateHandler struct {
	repo    *repository.ApplianceRepository
	service *service.CalculatorService
}

func NewCalculateHandler(repo *repository.ApplianceRepository, calcService *service.CalculatorService) *CalculateHandler {
	return &CalculateHandler{
		repo:    repo,
		service: calcService,
	}
}

type CalculateRequest struct {
	PowerVA int `json:"power_va"`
}

func (h *CalculateHandler) CalculateSummary(w http.ResponseWriter, r *http.Request) {
	userID, err := middleware.GetUserID(r.Context())
	if err != nil {
		writeError(w, http.StatusUnauthorized, "Unauthorized")
		return
	}

	powerVA := 1300
	if r.ContentLength > 0 {
		var req CalculateRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err == nil && req.PowerVA > 0 {
			powerVA = req.PowerVA
		}
	}

	appliances, err := h.repo.FindByUserID(r.Context(), userID)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "Failed to fetch user appliances")
		return
	}

	summary := h.service.BuildSummary(appliances, powerVA)
	writeJSON(w, http.StatusOK, summary)
}
