package handlers

import (
	"backend/internal/models"
	"backend/internal/storage/postgres"
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/go-pkgz/routegroup"
)

type Add_ServHandler struct {
	storage *postgres.Storage
}


func NewAdd_ServHandler(storage *postgres.Storage) *Add_ServHandler {
	return &Add_ServHandler{storage: storage}
}

func (h *Add_ServHandler) RegisterRoutes(router *routegroup.Bundle) {
	router.HandleFunc("GET /api/additional-services", h.GetAdd_Serv)
	router.HandleFunc("GET /api/additional-services/{id}", h.GetAdd_ServByID)
	router.HandleFunc("POST /api/additional-services", h.CreateAdd_Serv)
	router.HandleFunc("PUT /api/additional-services/{id}", h.UpdateAdd_Serv)
	router.HandleFunc("DELETE /api/additional-services/{id}", h.DeleteAdd_Serv)
}

func (h *Add_ServHandler) GetAdd_Serv(w http.ResponseWriter, r *http.Request) {
	add_servs, err := h.storage.GetAdditional_services(r.Context())
	if err != nil {
		http.Error(w, "Failed to get additional services", http.StatusInternalServerError)
		log.Printf("Failed to get additional services: %v", err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(add_servs); err != nil {
		log.Print(err)
		return
	}
}

func (h *Add_ServHandler) GetAdd_ServByID(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		log.Printf("Invalid ID: %v", err)
		return
	}

	add_serv, err := h.storage.GetAdditional_servicesByID(r.Context(), id)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Additional service not found", http.StatusNotFound)
			log.Printf("Additional service not found: %v", err)
		} else {
			http.Error(w, "Failed to get additional service", http.StatusInternalServerError)
			log.Printf("Failed to get additional service: %v", err)
		}
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(add_serv); err != nil {
		log.Print(err)
		return
	}

}

func (h *Add_ServHandler) CreateAdd_Serv(w http.ResponseWriter, r *http.Request) {
	var add_serv models.Additional_services
	err := json.NewDecoder(r.Body).Decode(&add_serv) 
	if err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		log.Printf("Invalid JSON: %v", err)
		return
	}

	id, err := h.storage.CreateAdditional_services(r.Context(), &add_serv) 
	if err != nil {
		http.Error(w, "Failed to create additional service", http.StatusInternalServerError)
		log.Printf("Failed to create additional service: %v", err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	err = json.NewEncoder(w).Encode(add_serv) 
	if err != nil {
		log.Print(err)
		return
	}
	log.Print(id)
}

func (h *Add_ServHandler) UpdateAdd_Serv(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Invalid additional service id", http.StatusBadRequest)
		log.Print("Invalid ID: %w", err)
		return
	}

	var add_serv models.Additional_services
	err = json.NewDecoder(r.Body).Decode(&add_serv)
	if err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		log.Printf("Invalid JSON: %v", err)
		return
	}
	
	add_serv.ID_Additional = id
	if err := h.storage.UpdateAdditional_services(r.Context(), &add_serv); err != nil {
		http.Error(w, "Failed to update additional service", http.StatusInternalServerError)
		log.Printf("Failed to update room: %v", err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(add_serv); err != nil {
		log.Print(err)
		return
	}
}

func (h *Add_ServHandler) DeleteAdd_Serv(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}

	err = h.storage.DeleteAdditional_services(r.Context(), id)
	if err != nil {
		http.Error(w, "Failed to delete additional service", http.StatusInternalServerError)
		log.Printf("Failed to delete additional service: %v", err)
		return
	}
	
	w.WriteHeader(http.StatusNoContent)
}