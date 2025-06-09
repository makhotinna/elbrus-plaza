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

type ClientHandler struct {
	storage *postgres.Storage
}

func NewClientHandler(storage *postgres.Storage) *ClientHandler {
	return &ClientHandler{storage: storage}
}

func (h *ClientHandler) RegisterRoutes(router *routegroup.Bundle) {
	router.HandleFunc("GET /api/client", h.GetClients)
	router.HandleFunc("GET /api/client/{id}", h.GetClientByID)
	router.HandleFunc("POST /api/client", h.CreateClient)
	router.HandleFunc("PUT /api/client/{id}", h.UpdateClient)
	router.HandleFunc("DELETE /api/client/{id}", h.DeleteClient)
}

func (h *ClientHandler) GetClients(w http.ResponseWriter, r *http.Request) {
	client, err := h.storage.GetClients(r.Context())
	if err != nil {
		http.Error(w, "Failed to get client", http.StatusInternalServerError)
		log.Printf("Failed to get client: %v", err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(client); err != nil {
		log.Print(err)
	}
}

func (h *ClientHandler) GetClientByID(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		log.Printf("Invalid ID: %v", err)
		return
	}

	client, err := h.storage.GetClientByID(r.Context(), id)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Client not found", http.StatusNotFound)
			log.Printf("Client not found: %v", err)
		} else {
			http.Error(w, "Failed to get client", http.StatusInternalServerError)
			log.Printf("Failed to get client: %v", err)
		}
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(client); err != nil {
		log.Print(err)
		return
	}

}

func (h *ClientHandler) CreateClient(w http.ResponseWriter, r *http.Request) {
	var client models.Client
	err := json.NewDecoder(r.Body).Decode(&client) 
	if err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		log.Printf("Invalid JSON: %v", err)
		return
	}

	id, err := h.storage.CreateClient(r.Context(), &client) 
	if err != nil {
		http.Error(w, "Failed to create client", http.StatusInternalServerError)
		log.Printf("Failed to create client: %v", err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	err = json.NewEncoder(w).Encode(client) 
	if err != nil {
		log.Print(err)
		return
	}
	log.Print(id)
}

func (h *ClientHandler) UpdateClient(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Invalid client id", http.StatusBadRequest)
		log.Print("Invalid ID: %w", err)
		return
	}

	var client models.Client
	err = json.NewDecoder(r.Body).Decode(&client)
	if err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		log.Printf("Invalid JSON: %v", err)
		return
	}
	
	client.ID_Client = id
	if err := h.storage.UpdateClient(r.Context(), &client); err != nil {
		http.Error(w, "Failed to update client", http.StatusInternalServerError)
		log.Printf("Failed to update client: %v", err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(client); err != nil {
		log.Print(err)
		return
	}
}

func (h *ClientHandler) DeleteClient(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}

	err = h.storage.DeleteClient(r.Context(), id)
	if err != nil {
		http.Error(w, "Failed to delete client", http.StatusInternalServerError)
		log.Printf("Failed to delete client: %v", err)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}