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

type RoomHandler struct {
	storage *postgres.Storage
}

func NewRoomHandler(storage *postgres.Storage) *RoomHandler {
	return &RoomHandler{storage: storage}
}

func (h *RoomHandler) RegisterRoutes(router *routegroup.Bundle) {
	router.HandleFunc("GET /api/rooms", h.GetRooms)
	router.HandleFunc("GET /api/rooms/{id}", h.GetRoom)
	router.HandleFunc("POST /api/rooms", h.CreateRoom)
	router.HandleFunc("PUT /api/rooms/{id}", h.UpdateRoom)
	router.HandleFunc("DELETE /api/rooms/{id}", h.DeleteRoom)
}

func (h *RoomHandler) GetRooms(w http.ResponseWriter, r *http.Request) {
	rooms, err := h.storage.GetRooms(r.Context())
	if err != nil {
		http.Error(w, "Failed to get rooms", http.StatusInternalServerError)
		log.Print(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(rooms); err != nil {
		log.Print(err)
	}
}

func (h *RoomHandler) GetRoom(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Invalid room ID", http.StatusBadRequest)
		return
	}

	room, err := h.storage.GetRoomByID(r.Context(), id)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Room not found", http.StatusNotFound)
		} else {
			http.Error(w, "Failed to get room", http.StatusInternalServerError)
		}
		log.Print(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(room); err != nil {
		log.Print(err)
	}
}

func (h *RoomHandler) CreateRoom(w http.ResponseWriter, r *http.Request) {
	var room models.Room
	err := json.NewDecoder(r.Body).Decode(&room) 
	if err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		log.Print("Invalid JSON")
		return
	}

	id, err := h.storage.CreateRoom(r.Context(), &room) 
	if err != nil {
		http.Error(w, "Failed to create room", http.StatusInternalServerError)
		log.Print(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	err = json.NewEncoder(w).Encode(room) 
	if err != nil {
		log.Print(err)
		return
	}
	log.Print(id)
}

func (h *RoomHandler) UpdateRoom(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Invalid room ID", http.StatusBadRequest)
		return
	}

	var room models.Room
	err = json.NewDecoder(r.Body).Decode(&room) 
	if err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		log.Print("Invalid JSON")
		return
	}

	room.ID_Room = id
	if err := h.storage.UpdateRoom(r.Context(), &room); err != nil {
		http.Error(w, "Failed to update room", http.StatusInternalServerError)
		log.Print(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(room); err != nil {
		log.Print(err)
		return
	}
}

func (h *RoomHandler) DeleteRoom(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Invalid room ID", http.StatusBadRequest)
		return
	}

	err = h.storage.DeleteRoom(r.Context(), id) 
	if err != nil {
		http.Error(w, "Failed to delete room", http.StatusInternalServerError)
		log.Print(err)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
