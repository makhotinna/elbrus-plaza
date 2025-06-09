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

type BookingHandler struct {
	storage *postgres.Storage
}

func NewBookingHandler(storage *postgres.Storage) *BookingHandler {
	return &BookingHandler{storage: storage}
}

func (h *BookingHandler) RegisterRoutes(router *routegroup.Bundle) {
	router.HandleFunc("GET /api/bookings", h.GetBooking)
	router.HandleFunc("GET /api/bookings/{id}", h.GetBookingByID)
	//router.HandleFunc("POST /api/bookings/user", h.CreateBookingUser)
	router.HandleFunc("POST /api/bookings/admin", h.CreateBookingAdmin)
	router.HandleFunc("PUT /api/bookings/{id}", h.UpdateBooking)
	router.HandleFunc("DELETE /api/bookings/{id}", h.DeleteBooking)
}

func (h *BookingHandler) GetBooking(w http.ResponseWriter, r *http.Request) {
	bookings, err := h.storage.GetBooking(r.Context())
	if err != nil {
		http.Error(w, "Failed to get bookings", http.StatusInternalServerError)
		log.Printf("Failed to get bookings: %v", err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(bookings); err != nil {
		log.Print(err)
	}
}

func (h *BookingHandler) GetBookingByID(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		log.Printf("Invalid ID: %v", err)
		return
	}

	bookings, err := h.storage.GetBookingByID(r.Context(), id)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Booking not found", http.StatusNotFound)
			log.Printf("Booking not found: %v", err)
		} else {
			http.Error(w, "Failed to get booking", http.StatusInternalServerError)
			log.Printf("Failed to get booking: %v", err)
		}
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(bookings); err != nil {
		log.Print(err)
		return
	}

}

func (h *BookingHandler) CreateBookingAdmin(w http.ResponseWriter, r *http.Request) {
	var booking models.Booking
	err := json.NewDecoder(r.Body).Decode(&booking) 
	if err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		log.Printf("Invalid JSON: %v", err)
		return
	}

	id, err := h.storage.CreateBookingAdmin(r.Context(), &booking) 
	if err != nil {
		http.Error(w, "Failed to create booking", http.StatusInternalServerError)
		log.Printf("Failed to create booking: %v", err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	err = json.NewEncoder(w).Encode(booking) 
	if err != nil {
		log.Print(err)
		return
	}
	log.Print(id)
}

func (h *BookingHandler) UpdateBooking(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Invalid booking id", http.StatusBadRequest)
		log.Print("Invalid ID: %w", err)
		return
	}

	var booking models.Booking
	err = json.NewDecoder(r.Body).Decode(&booking)
	if err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		log.Printf("Invalid JSON: %v", err)
		return
	}
	
	booking.ID_Booking = id
	if err := h.storage.UpdateBooking(r.Context(), &booking); err != nil {
		http.Error(w, "Failed to update booking", http.StatusInternalServerError)
		log.Printf("Failed to update booking: %v", err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(booking); err != nil {
		log.Print(err)
		return
	}
}

func (h *BookingHandler) DeleteBooking(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}

	err = h.storage.DeleteBooking(r.Context(), id)
	if err != nil {
		http.Error(w, "Failed to delete booking", http.StatusInternalServerError)
		log.Printf("Failed to delete booking: %v", err)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}