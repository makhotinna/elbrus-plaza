package postgres

import (
	"backend/internal/models"
	"context"
	"fmt"
)

// func (s *Storage) searchForAvailableRooms(ctx context.Context, db *sqlx.DB, roomType string, numberOfBeds int, startTime time.Time, endTime time.Time, clientsName string, cost int) ([]models.Room, error) {
// 	var rooms []models.Room
// 	query := `SELECT r.id, r.type, r.Number_of_beds, r.rate_per_night
//         FROM rooms r
//         WHERE r.room_type = $1
//         AND r.Room_Availability = true
// 		AND r.Number_of_beds = $2
//         AND NOT EXISTS (
//             SELECT 1 FROM bookings b
//             WHERE b.room_id = r.id
//             AND b.status = 'confirmed'
//             AND b.check_out_date > $3
//             AND b.check_in_date < $4
//         )`
// 	err := s.DB.SelectContext(ctx, &rooms, query, roomType, numberOfBeds, startTime, endTime)
// 	if err != nil {
// 		return nil, fmt.Errorf("Couldn't get rooms: %w", err)
// 	}
// 	return rooms, nil
// }

// func (s *Storage) createBooking(ctx context.Context, RoomType string, StartTime time.Time, EndTime time.Time, ClientsName string, Cost int) (*models.Booking, error) {
//     var booking models.Booking
//     query := `
//         INSERT INTO bookings 
//         (room_id, user_id, check_in_date, check_out_date, status, payment_id)
//         VALUES ($1, $2, $3, $4, 'подтверждено', $5)
//         RETURNING id, created_at`
    
//     if err != nil {
//         return nil, fmt.Errorf("failed to create booking: %v", err)
//     }
// }

func (s *Storage) GetBooking(ctx context.Context) ([]models.Booking, error) {
	var booking []models.Booking

	err := s.DB.SelectContext(ctx, &booking, "select * from Booking")
	if err != nil {
		return nil, fmt.Errorf("Couldn't get booking: %w", err)
	}

	return booking, nil
}


func (s *Storage) CreateBookingAdmin(ctx context.Context, booking *models.Booking) (int64, error) {
	var id int64

	query := `insert into Booking (ID_Client, ID_Room, In_date_booking, Out_date_booking, Price_of_booking, Status_booking, Status_payment) values ($1, $2, $3, $4, $5, $6, $7) returning ID_Booking`
	err := s.DB.QueryRowContext(ctx, query, booking.ID_Client, booking.ID_Room, booking.In_date_booking, booking.Out_date_booking, booking.Price_of_booking, booking.Status_booking, booking.Status_payment).Scan(&id)
	if err != nil {
		return -1, fmt.Errorf("Couldn't create an booking: %w", err)
	}

	return id, nil
}

func (s *Storage) UpdateBooking(ctx context.Context, booking *models.Booking) error {
	query := `update Booking set ID_Client = :ID_Client, ID_Room = :ID_Room, In_date_booking = :In_date_booking, Out_date_booking = :Out_date_booking, Price_of_booking = :Price_of_booking, Status_booking = :Status_booking, Status_payment = :Status_payment`
	_, err := s.DB.NamedExecContext(ctx, query, booking)
	if err != nil {
		return fmt.Errorf("Couldn't update an booking: %w", err)
	}

	return nil
}

func (s *Storage) GetBookingByID(ctx context.Context, id int) (*models.Booking, error) {
	var booking models.Booking
	query := `select * from Booking where ID_Booking = $1`
	
	err := s.DB.GetContext(ctx, &booking, query, id)
	if err != nil {
		return nil, fmt.Errorf("Couldn't get an booking with id = %d: %w", id, err)
	}

	return &booking, nil
}

func (s *Storage) DeleteBooking(ctx context.Context, id int) error {
	query := `delete from Booking where ID_Booking = $1`
	if _, err := s.DB.ExecContext(ctx, query, id); err != nil {
		return fmt.Errorf("Couldn't delete an booking: %w", err)
	}
	return nil
}







// func confirmBooking(db *sql.DB, bookingCode string, paymentInfo PaymentDetails) (*Booking, error) {
//     tx, err := db.Begin()
//     if err != nil {
//         return nil, err
//     }
//     defer tx.Rollback()
    
//     // // 1. Проверяем холд
//     // var hold Hold
//     // err = tx.QueryRow(`
//     //     SELECT room_id, user_id, check_in, check_out 
//     //     FROM temporary_holds 
//     //     WHERE booking_code = $1 AND hold_expires > NOW()`,
//     //     bookingCode).Scan(&hold.RoomID, &hold.UserID, &hold.CheckIn, &hold.CheckOut)
    
//     // if err != nil {
//     //     return nil, fmt.Errorf("invalid or expired booking code")
//     // }
    
//     // 2. Проверяем доступность номера
//     available, err := isRoomAvailable(tx, hold.RoomID, hold.CheckIn, hold.CheckOut)
//     if err != nil || !available {
//         return nil, fmt.Errorf("room no longer available")
//     }
    
//     // 3. Обработка платежа
    
//     // 4. Создание бронирования
    
//     // 5. Удаление временного холда
//     _, err = tx.Exec("DELETE FROM temporary_holds WHERE booking_code = $1", bookingCode)
//     if err != nil {
//         return nil, fmt.Errorf("failed to clear hold: %v", err)
//     }
    
//     // 6. Отправка подтверждения
    
//     err = tx.Commit()
//     if err != nil {
//         return nil, fmt.Errorf("transaction failed: %v", err)
//     }
    
//     return &booking, nil
// }

// func (s *Storage) holdRoom(ctx context.Context, roomID int, userID int, checkIn, checkOut time.Time) (int, error) {
// 	var id int

//     query := `
//         INSERT INTO temporary_holds 
//         (room_id, user_id, check_in, check_out, hold_expires, booking_code)
//         VALUES ($1, $2, $3, $4, $5, $6)`

//     err := s.DB.QueryRowxContext(ctx, query, roomID, userID, checkIn, checkOut, time.Now().Add(15*time.Minute)).Scan(&id)
//     if err != nil {
// 		fmt.Errorf("Couldn't hold a room: %w", err)
// 		return -1, err
// 	}
    
// 	return id, nil
// }