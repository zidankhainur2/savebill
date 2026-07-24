package handler

import (
	"encoding/json"
	"net/http"

	"savebill-api/internal/middleware"
	"savebill-api/internal/model"
	"savebill-api/internal/repository"

	"github.com/go-chi/chi/v5"
)

type ApplianceHandler struct {
	repo *repository.ApplianceRepository
}

func NewApplianceHandler(repo *repository.ApplianceRepository) *ApplianceHandler {
	return &ApplianceHandler{repo: repo}
}

func writeJSON(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(map[string]interface{}{"data": data})
}

func writeError(w http.ResponseWriter, status int, msg string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(map[string]string{"error": msg})
}

func (h *ApplianceHandler) GetAppliances(w http.ResponseWriter, r *http.Request) {
	userID, err := middleware.GetUserID(r.Context())
	if err != nil {
		writeError(w, http.StatusUnauthorized, "Unauthorized")
		return
	}

	appliances, err := h.repo.FindByUserID(r.Context(), userID)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "Failed to fetch appliances")
		return
	}

	writeJSON(w, http.StatusOK, appliances)
}

func (h *ApplianceHandler) CreateAppliance(w http.ResponseWriter, r *http.Request) {
	userID, err := middleware.GetUserID(r.Context())
	if err != nil {
		writeError(w, http.StatusUnauthorized, "Unauthorized")
		return
	}

	var req model.UserAppliance
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "Invalid JSON request body")
		return
	}

	if req.Name == "" {
		writeError(w, http.StatusBadRequest, "Appliance name is required")
		return
	}
	if req.Watt <= 0 {
		writeError(w, http.StatusBadRequest, "Watt must be greater than 0")
		return
	}
	if req.Qty <= 0 {
		req.Qty = 1
	}
	if req.DailyHours < 0 || req.DailyHours > 24 {
		writeError(w, http.StatusBadRequest, "Daily hours must be between 0 and 24")
		return
	}

	req.UserID = userID
	if err := h.repo.Create(r.Context(), &req); err != nil {
		writeError(w, http.StatusInternalServerError, "Failed to create appliance")
		return
	}

	writeJSON(w, http.StatusCreated, req)
}

func (h *ApplianceHandler) UpdateAppliance(w http.ResponseWriter, r *http.Request) {
	userID, err := middleware.GetUserID(r.Context())
	if err != nil {
		writeError(w, http.StatusUnauthorized, "Unauthorized")
		return
	}

	id := chi.URLParam(r, "id")
	if id == "" {
		writeError(w, http.StatusBadRequest, "Appliance ID is required")
		return
	}

	var req model.UserAppliance
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "Invalid JSON request body")
		return
	}

	if req.Name == "" || req.Watt <= 0 || req.DailyHours < 0 || req.DailyHours > 24 {
		writeError(w, http.StatusBadRequest, "Invalid appliance data")
		return
	}
	if req.Qty <= 0 {
		req.Qty = 1
	}

	req.ID = id
	req.UserID = userID

	if err := h.repo.Update(r.Context(), &req); err != nil {
		writeError(w, http.StatusInternalServerError, "Failed to update appliance")
		return
	}

	writeJSON(w, http.StatusOK, req)
}

func (h *ApplianceHandler) DeleteAppliance(w http.ResponseWriter, r *http.Request) {
	userID, err := middleware.GetUserID(r.Context())
	if err != nil {
		writeError(w, http.StatusUnauthorized, "Unauthorized")
		return
	}

	id := chi.URLParam(r, "id")
	if id == "" {
		writeError(w, http.StatusBadRequest, "Appliance ID is required")
		return
	}

	if err := h.repo.Delete(r.Context(), id, userID); err != nil {
		writeError(w, http.StatusInternalServerError, "Failed to delete appliance")
		return
	}

	writeJSON(w, http.StatusOK, map[string]string{"message": "Appliance deleted successfully"})
}

func (h *ApplianceHandler) GetPresets(w http.ResponseWriter, r *http.Request) {
	presets, err := h.repo.FindPresets(r.Context())
	if err != nil {
		writeError(w, http.StatusInternalServerError, "Failed to fetch presets")
		return
	}

	writeJSON(w, http.StatusOK, presets)
}
