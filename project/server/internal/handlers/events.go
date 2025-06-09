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

type EventsHandler struct {
	storage *postgres.Storage
}

func NewEventsHandler(storage *postgres.Storage) *EventsHandler {
	return &EventsHandler{storage: storage}
}

func (h *EventsHandler) RegisterRoutes(router *routegroup.Bundle) {
	router.HandleFunc("GET /api/events", h.GetEvents)
	router.HandleFunc("GET /api/events/{id}", h.GetEventByID)
	router.HandleFunc("POST /api/events", h.CreateEvent)
	router.HandleFunc("PUT /api/events/{id}", h.UpdateEvent)
	router.HandleFunc("DELETE /api/events/{id}", h.DeleteEvent)
}

func (h *EventsHandler) GetEvents(w http.ResponseWriter, r *http.Request) {
	events, err := h.storage.GetEvents(r.Context())
	if err != nil {
		http.Error(w, "Failed to get events", http.StatusInternalServerError)
		log.Printf("Failed to get events: %v", err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(events); err != nil {
		log.Print(err)
	}
}

func (h *EventsHandler) GetEventByID(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		log.Printf("Invalid ID: %v", err)
		return
	}

	events, err := h.storage.GetEventByID(r.Context(), id)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Event not found", http.StatusNotFound)
			log.Printf("Event not found: %v", err)
		} else {
			http.Error(w, "Failed to get event", http.StatusInternalServerError)
			log.Printf("Failed to get event: %v", err)
		}
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(events); err != nil {
		log.Print(err)
		return
	}

}

func (h *EventsHandler) CreateEvent(w http.ResponseWriter, r *http.Request) {
	var event models.Events
	err := json.NewDecoder(r.Body).Decode(&event) 
	if err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		log.Printf("Invalid JSON: %v", err)
		return
	}

	id, err := h.storage.CreateEvents(r.Context(), &event) 
	if err != nil {
		http.Error(w, "Failed to create event", http.StatusInternalServerError)
		log.Printf("Failed to create event: %v", err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	err = json.NewEncoder(w).Encode(event) 
	if err != nil {
		log.Print(err)
		return
	}
	log.Print(id)
}

func (h *EventsHandler) UpdateEvent(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Invalid event id", http.StatusBadRequest)
		log.Print("Invalid ID: %w", err)
		return
	}

	var event models.Events
	err = json.NewDecoder(r.Body).Decode(&event)
	if err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		log.Printf("Invalid JSON: %v", err)
		return
	}
	
	event.ID_Events = id
	if err := h.storage.UpdateEvents(r.Context(), &event); err != nil {
		http.Error(w, "Failed to update event", http.StatusInternalServerError)
		log.Printf("Failed to update event: %v", err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(event); err != nil {
		log.Print(err)
		return
	}
}

func (h *EventsHandler) DeleteEvent(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}

	err = h.storage.DeleteEvent(r.Context(), id)
	if err != nil {
		http.Error(w, "Failed to delete event", http.StatusInternalServerError)
		log.Printf("Failed to delete event: %v", err)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}