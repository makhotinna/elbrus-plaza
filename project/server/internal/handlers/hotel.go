package handlers

import (
	"backend/internal/models"
	"backend/internal/storage/postgres"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/go-pkgz/routegroup"
)

type HotelHandler struct {
	storage *postgres.Storage
}


func NewHotelHandler(storage *postgres.Storage) *HotelHandler {
	return &HotelHandler{storage: storage}
}

func (h *HotelHandler) RegisterRoutes(router *routegroup.Bundle) {
	router.HandleFunc("GET /api/hotel", h.GetHotels)
	router.HandleFunc("GET /api/hotel/{id}", h.GetHotelByID)
	router.HandleFunc("POST /api/hotel", h.CreateHotel)
	router.HandleFunc("GET /api/hotel/{id}/rooms", h.GetAllRooms)
    router.HandleFunc("GET /api/hotel/{id}/rooms/available", h.GetAvailableRooms)
	router.HandleFunc("GET /api/hotel/{id}/rooms/unavailable", h.GetUnavailableRooms)
	router.HandleFunc("PUT /api/hotel/{id}", h.UpdateHotel)
	router.HandleFunc("DELETE /api/hotel/{id}", h.DeleteHotel)
}

func (h *HotelHandler) GetAllRooms(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Invalid hotel ID", http.StatusBadRequest)
		return
	}

	rooms, err := h.storage.GetAllHotelRooms(r.Context(), id)
	if err != nil {
		http.Error(w, "Failed to get hotels", http.StatusInternalServerError)
		log.Print(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(rooms); err != nil {
		log.Print(err)
		return
	}
}

func (h *HotelHandler) GetAvailableRooms(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Invalid hotel ID", http.StatusBadRequest)
		return
	}

	rooms, err := h.storage.GetAvailableHotelRooms(r.Context(), id)
	if err != nil {
		http.Error(w, "Failed to get hotels", http.StatusInternalServerError)
		log.Print(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(rooms); err != nil {
		log.Print(err)
		return
	}
}

func (h *HotelHandler) GetUnavailableRooms(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Invalid hotel ID", http.StatusBadRequest)
		return
	}

	rooms, err := h.storage.GetUnavailableHotelRooms(r.Context(), id)
	if err != nil {
		http.Error(w, "Failed to get hotels", http.StatusInternalServerError)
		log.Print(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(rooms); err != nil {
		log.Print(err)
		return
	}
}

func (h *HotelHandler) GetHotels(w http.ResponseWriter, r *http.Request) {
	hotels, err := h.storage.GetHotels(r.Context())
	if err != nil {
		http.Error(w, "Failed to get hotels", http.StatusInternalServerError)
		log.Print(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(hotels); err != nil {
		log.Print(err)
		return
	}
}

func (h *HotelHandler) GetHotelByID(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Invalid hotel ID", http.StatusBadRequest)
		return
	}

	room, err := h.storage.GetHotelByID(r.Context(), id)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Hotel not found", http.StatusNotFound)
		} else {
			http.Error(w, "Failed to get hotel", http.StatusInternalServerError)
		}
		log.Print(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(room); err != nil {
		log.Print(err)
		return
	}
}

func (h *HotelHandler) CreateHotel(w http.ResponseWriter, r *http.Request) {
	var hotel models.Hotel
	err := json.NewDecoder(r.Body).Decode(&hotel) 
	if err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		log.Print("Invalid JSON")
		return
	}

	fmt.Println(hotel)

	id, err := h.storage.CreateHotel(r.Context(), &hotel) 
	if err != nil {
		http.Error(w, "Failed to create hotel", http.StatusInternalServerError)
		log.Print(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	err = json.NewEncoder(w).Encode(hotel) 
	if err != nil {
		log.Print(err)
		return
	}
	log.Print(id)
}

func (h *HotelHandler) UpdateHotel(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Invalid hotel ID", http.StatusBadRequest)
		return
	}

	var hotel models.Hotel
	err = json.NewDecoder(r.Body).Decode(&hotel) 
	if err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		log.Print("Invalid JSON")
		return
	}

	hotel.ID_Hotel = id
	if err := h.storage.UpdateHotel(r.Context(), &hotel); err != nil {
		http.Error(w, "Failed to update room", http.StatusInternalServerError)
		log.Print(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(hotel); err != nil {
		log.Print(err)
		return
	}
}

func (h *HotelHandler) DeleteHotel(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Invalid hotel ID", http.StatusBadRequest)
		return
	}

	err = h.storage.DeleteHotel(r.Context(), id) 
	if err != nil {
		http.Error(w, "Failed to delete hotel", http.StatusInternalServerError)
		log.Print(err)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
