package handlers

import (
	"backend/internal/models"
	"backend/internal/storage/postgres"
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"time"

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
	router.HandleFunc("GET /api/bookings/temp/{id}", h.GetTempBookingByID)
	router.HandleFunc("POST /api/bookings/temp", h.InitTempBooking)
	router.HandleFunc("PUT /api/bookings/temp/{id}", h.UpdateTempBooking)
	router.HandleFunc("POST /api/bookings", h.CreateBookingUser)
	router.HandleFunc("POST /api/bookings/admin", h.CreateBookingAdmin)
	router.HandleFunc("PUT /api/bookings/{id}", h.UpdateBooking)
	router.HandleFunc("DELETE /api/bookings/{id}", h.DeleteBooking)
}

// func parseAndValidateDates(in_date_booking, out_date_booking string) (time.Time, time.Time, error) {
//     in_date, err := time.Parse("2006-01-02", in_date_booking)
//     if err != nil {
//         return time.Time{}, time.Time{}, fmt.Errorf("invalid check_in date")
//     }

//     out_date, err := time.Parse("2006-01-02", out_date_booking)
//     if err != nil {
//         return time.Time{}, time.Time{}, fmt.Errorf("invalid check_out date")
//     }

//     if out_date.Before(in_date) {
//         return time.Time{}, time.Time{}, fmt.Errorf("check_out must be after or equal check_in")
//     }

//     return in_date, out_date, nil
// }

func (h *BookingHandler) CreateBookingAdmin(w http.ResponseWriter, r *http.Request) {
	type rawResponse struct{
		Room_Type string `json:"Room_type"`
		In_date_booking	time.Time `json:"in_date_booking"`
		Out_date_booking time.Time `json:"out_date_booking"`
		Price_of_booking float64 `json:"price_of_booking"`
		Name_client string	`json:"name_client"`
		Email_client string	`json:"email_client"`
		Phone_client string	`json:"phone_client"`
	}

	var rawResponse1 rawResponse

	err := json.NewDecoder(r.Body).Decode(&rawResponse1)
	if err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		log.Printf("Invalid JSON: %v", err)
		return
	}

	ctx := r.Context()

	isAvailable, err := h.storage.CheckCertainAvailability(ctx, rawResponse1.Room_Type, rawResponse1.In_date_booking, rawResponse1.Out_date_booking)
	if err != nil {
		http.Error(w, "Couldn't check for rooms " + err.Error(), http.StatusInternalServerError)
		log.Print(err)
		return
	}
	
	if !isAvailable {
		http.Error(w, "Rooms of this type are not available", http.StatusBadRequest)
		log.Print("Rooms of this type are not available")
		return
	}

	id_room, id_hotel, _, err := h.storage.SelectRoom(ctx, rawResponse1.Room_Type, rawResponse1.In_date_booking, rawResponse1.Out_date_booking)
	if err != nil {
		http.Error(w, "Couldn't select room" + err.Error(), http.StatusInternalServerError)
		log.Printf("Couldn't select room: %v", err)
		return
	}

	finalBooking := models.Booking {
		ID_Booking: 0,
		ID_Room: &id_room,
		Room_Type: rawResponse1.Room_Type,
		In_date_booking: rawResponse1.In_date_booking,
		Out_date_booking: rawResponse1.Out_date_booking,
		Price_of_booking: &rawResponse1.Price_of_booking,
		Created_At: time.Now(),
	}

	client := models.Client {
		ID_Hotel: &id_hotel,
		Name_client: rawResponse1.Name_client,
		Email_client: rawResponse1.Email_client,
		Phone_client: rawResponse1.Phone_client,

	}


	id_client, err := h.storage.GetOrCreateClient(ctx, &client)
	if err != nil {
		http.Error(w, "couldn't get client" + err.Error(), http.StatusInternalServerError)
		log.Printf("Couldn't get client: %v", err)
		return
	}


	finalBooking.ID_Client = &id_client

	id, err := h.storage.CreateBooking(ctx, &finalBooking, id_hotel)
	if err != nil {
		http.Error(w, "Couldn't create booking", http.StatusInternalServerError)
		log.Printf("Couldn't create final booking: %v", err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	err = json.NewEncoder(w).Encode(&finalBooking) 
	if err != nil {
		log.Print(err)
		return
	}
	log.Print(id)
}

//сделать кнопку проверки доступности номера
func (h *BookingHandler) InitTempBooking(w http.ResponseWriter, r *http.Request) {
	var request struct {
		In_date_booking time.Time `json:"in_date_booking"`
		Out_date_booking time.Time `json:"out_date_booking"`
		Room_type *string `json:"room_type"`
	}

	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		http.Error(w, "Failed to decode body of request while creating temp booking (Invalid JSON):" + err.Error(), http.StatusBadRequest)
		log.Print(err)
		return
	}

	id_temp, err := h.storage.CreateTempBooking(r.Context(), request.Room_type, request.In_date_booking, request.Out_date_booking)
	if err != nil {
		http.Error(w, "Couldn't create temp booking " + err.Error(), http.StatusInternalServerError)
		log.Printf("Couldn't create temp booking: %v", err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(map[string]interface{}{
		"id_temp_booking": id_temp,
	})
	if err != nil {
		log.Print(err)
	}
}

// func nextStep(room_type *string) string {
// 	if room_type == nil {
// 		return "numbers"
// 	}
// 	return "bookingform"
// }

func (h *BookingHandler) UpdateTempBooking(w http.ResponseWriter, r *http.Request) {
	id_temp_booking, err := strconv.Atoi(r.PathValue("id"))
		if err != nil {
		http.Error(w, "Invalid ID of temp booking: " + err.Error(), http.StatusBadRequest)
		log.Printf("Invalid ID of temp booking: %v", err)
		return
	}

	var updatedTempBooking models.Booking
	err = json.NewDecoder(r.Body).Decode(&updatedTempBooking)
	if err != nil {
		http.Error(w, "Failed to decode body of request while updating temp booking (Invalid JSON): " + err.Error(), http.StatusBadRequest)
		log.Printf("Failed to decode body of request while updating temp booking (Invalid JSON): %v", err)
		return
	}

	updatedTempBooking.ID_Booking = id_temp_booking
	err = h.storage.UpdateTempBooking(r.Context(), id_temp_booking, updatedTempBooking.Room_Type, updatedTempBooking.In_date_booking, updatedTempBooking.Out_date_booking)
	if err != nil {
		http.Error(w, "Failed to update temp booking", http.StatusInternalServerError)
		log.Printf("Failed to update temp booking: %v", err)
		return
	}
	
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(updatedTempBooking); err != nil {
		log.Print(err)
		return
	}
}

func (h *BookingHandler) CreateBookingUser(w http.ResponseWriter, r *http.Request) {

	type rawResponse struct{
		ID_Booking int `json:"id_booking"`
		Room_Type string `json:"type_room"`
		In_date_booking	time.Time `json:"in_date_booking"`
		Out_date_booking time.Time `json:"out_date_booking"`
		Price_of_booking float64 `json:"price_of_booking"`
		Name_client string	`json:"name_client"`
		Email_client string	`json:"email_client"`
		Phone_client string	`json:"phone_client"`
	}


	var rawResponse1 rawResponse

	err := json.NewDecoder(r.Body).Decode(&rawResponse1)
	if err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		log.Printf("Invalid JSON: %v", err)
		return
	}


	ctx := r.Context()

	var transactionErr error

	tx, err := h.storage.DB.BeginTxx(ctx, nil)
	if err != nil {
		http.Error(w, "Failed to start transaction " + err.Error(), http.StatusInternalServerError)
		log.Printf("Failed to start transaction: %v", err)
	}

	defer func() {
		if transactionErr != nil {
			if txErr := tx.Rollback(); txErr != nil {
				log.Printf("Transaction rollback error: %v", txErr)
			}
		}
	}()

	id_room, id_hotel, _, err := h.storage.SelectRoom(ctx, rawResponse1.Room_Type, rawResponse1.In_date_booking, rawResponse1.Out_date_booking)
	if err != nil {
		transactionErr = err
		log.Printf("asdasasdsad: %v", err)
		http.Error(w, "Couldn't select room while creating final booking by user: " + err.Error(), http.StatusInternalServerError)
		log.Printf("Couldn't select room while creating final booking by user: %v", err)
	}
	
	finalBooking := models.Booking {
		ID_Booking: 0,
		ID_Room: &id_room,
		Room_Type: rawResponse1.Room_Type,
		In_date_booking: rawResponse1.In_date_booking,
		Out_date_booking: rawResponse1.Out_date_booking,
		Price_of_booking: &rawResponse1.Price_of_booking,
		Created_At: time.Now(),
	}
	
	log.Print(finalBooking)

	client := models.Client {
		ID_Hotel: &id_hotel,
		Name_client: rawResponse1.Name_client,
		Email_client: rawResponse1.Email_client,
		Phone_client: rawResponse1.Phone_client,
	}
	

	id_client, err := h.storage.GetOrCreateClient(ctx, &client)
	if err != nil {
		transactionErr = err
		http.Error(w, "couldn't get client while creating final booking by user: " + err.Error(), http.StatusInternalServerError)
		log.Printf("Couldn't get client while creating final booking by user: : %v", err)
		return
	}

	finalBooking.ID_Client = &id_client

	id, err := h.storage.CreateBooking(ctx, &finalBooking, id_hotel)
	if err != nil {
		transactionErr = err
		http.Error(w, "Couldn't create final booking ", http.StatusInternalServerError)
		log.Printf("Couldn't create final booking: %v", err)
		return
	}

	log.Print(rawResponse1.ID_Booking)
	err = h.storage.DeleteTempBooking(ctx, rawResponse1.ID_Booking)
	if err != nil {
		http.Error(w, "Couldn't create final booking ", http.StatusInternalServerError)
		log.Printf("Couldn't create final booking: %v", err)
		return
	}

	if err = tx.Commit(); err != nil {
		http.Error(w, "Transaction commit failed: " + err.Error(), http.StatusInternalServerError)
        log.Printf("Transaction commit failed: %v", err)
        return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	err = json.NewEncoder(w).Encode(&finalBooking) 
	if err != nil {
		log.Print(err)
		return
	}
	log.Print(id)
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

func (h *BookingHandler) GetTempBookingByID(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		log.Printf("Invalid ID: %v", err)
		return
	}

	temp_booking, err := h.storage.GetTempBookingByID(r.Context(), id)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Booking not found", http.StatusNotFound)
			log.Printf("Booking not found: %v", err)
		} else {
			http.Error(w, "Failed to get temp booking", http.StatusInternalServerError)
			log.Printf("Failed to get booking: %v", err)
		}
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(temp_booking); err != nil {
		log.Print(err)
		return
	}

}

// func (h *BookingHandler) CreateBookingAdmin(w http.ResponseWriter, r *http.Request) {
// 	var booking models.Booking
// 	err := json.NewDecoder(r.Body).Decode(&booking) 
// 	if err != nil {
// 		http.Error(w, "Invalid JSON", http.StatusBadRequest)
// 		log.Printf("Invalid JSON: %v", err)
// 		return
// 	}

// 	id, err := h.storage.CreateBookingAdmin(r.Context(), &booking) 
// 	if err != nil {
// 		http.Error(w, "Failed to create booking", http.StatusInternalServerError)
// 		log.Printf("Failed to create booking: %v", err)
// 		return
// 	}

// 	w.Header().Set("Content-Type", "application/json")
// 	w.WriteHeader(http.StatusCreated)
// 	err = json.NewEncoder(w).Encode(booking) 
// 	if err != nil {
// 		log.Print(err)
// 		return
// 	}
// 	log.Print(id)
// }

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