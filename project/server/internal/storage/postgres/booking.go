package postgres

import (
	"backend/internal/models"
	"context"
	"database/sql"
	"errors"
	"fmt"
	"time"
)

func (s *Storage) CheckGeneralAvailability(ctx context.Context, in_date_booking time.Time, out_date_booking time.Time) (bool, error) {
    var availableRooms int
    
    err := s.DB.Get(&availableRooms, `
        SELECT COUNT(*) FROM (
            SELECT r.id_room FROM room r
            WHERE r.room_availability = true
			AND NOT EXISTS (
                SELECT 1 FROM booking b
                WHERE b.id_room = r.id_room
                AND $1 < b.out_date_booking AND $2 > b.in_date_booking
            )
        ) AS available_rooms`, out_date_booking, in_date_booking)
    
    if err != nil {
        return false, fmt.Errorf("failed to check general availability: %w", err)
    }
    
    return availableRooms > 0, nil
}

func (s *Storage) CheckCertainAvailability(ctx context.Context, room_type string, in_date_booking time.Time, out_date_booking time.Time) (bool, error) {
    var availableRooms int
    
    err := s.DB.Get(&availableRooms, `
        SELECT COUNT(*) FROM (
            SELECT r.id_room FROM room r
            WHERE r.room_availability = true
			AND NOT EXISTS (
                SELECT 1 FROM booking b
                WHERE b.id_room = r.id_room
				AND b.type_room = $1
                AND $2 < b.out_date_booking AND $3 > b.in_date_booking
            )
        ) AS available_rooms`, room_type, out_date_booking, in_date_booking)
    
    if err != nil {
        return false, fmt.Errorf("failed to check certain availability: %w", err)
    }
    
    return availableRooms > 0, nil
}

func (s *Storage) CreateTempBooking(ctx context.Context, room_type *string, in_date_booking time.Time, out_date_booking time.Time) (int64, error) {
	var id int64
	var available bool
	var err error

	if room_type == nil {
		available, err = s.CheckGeneralAvailability(ctx, in_date_booking, out_date_booking)
	} else {
		available, err = s.CheckCertainAvailability(ctx, *room_type, in_date_booking, out_date_booking)
	}
	if err != nil {
		return -1, fmt.Errorf("Couldn't create temp booking: %w", err)
	}

	if !available {
		return -1, fmt.Errorf("No available rooms")
	}

	query := "insert into temp_booking (in_date_booking, out_date_booking, type_room) values ($1, $2, $3) returning id_booking"
	if available {
		err := s.DB.QueryRowxContext(ctx, query, in_date_booking, out_date_booking, room_type).Scan(&id)
		if err != nil {
			return -1, fmt.Errorf("Coulnd't create temp_booking: %w", err)
		}
	}
	
	return id, nil
}

func (s *Storage) UpdateTempBooking(ctx context.Context, id_temp_booking int, room_type string, in_date_booking time.Time, out_date_booking time.Time) error {
	available, err := s.CheckCertainAvailability(ctx, room_type, in_date_booking, out_date_booking)
	if err != nil {
		return fmt.Errorf("Couldn't update temp booking: %w", err)
	}

	if !available {
		return fmt.Errorf("No available rooms")
	}

	query := "update temp_booking set type_room = $1,  in_date_booking = $2, out_date_booking = $3 where id_booking = $4"
	if available {
	row := s.DB.QueryRowxContext(ctx, query, room_type, in_date_booking, out_date_booking, id_temp_booking)
		if row.Err() != nil {
			return fmt.Errorf("Coulnd't fill temp_booking: %w", row.Err())
		}
	}
	
	return nil
}

func (s *Storage) CheckForClient(ctx context.Context, email_client, phone_number, name_client string) (int, error) {
	var (
		id_client int
		dbName string
		dbPhone string
	)

	query := `
        SELECT id_client, name_client, phone_client 
        FROM client 
        WHERE email_client = $1`
	err := s.DB.QueryRowxContext(ctx, query, email_client).Scan(&id_client, &dbName, &dbPhone)

    if err != nil {
        if errors.Is(err, sql.ErrNoRows) {
            return 0, nil
        }
        return 0, fmt.Errorf("ошибка при проверке клиента: %w", err)
    }
	
    if name_client != "" && name_client != dbName {
        return 0, fmt.Errorf("email уже используется другим пользователем (не совпадает имя)")
    }

    if phone_number != "" && phone_number != dbPhone {
        return 0, fmt.Errorf("email уже используется другим пользователем (не совпадает телефон)")
    }

	return id_client, nil // возможно будет ошибка, что nil
}

func (s *Storage) GetOrCreateClient(ctx context.Context, client *models.Client) (int, error) {
	id_client, err := s.CheckForClient(ctx, client.Email_client, client.Phone_client, client.Name_client)
	
	if err != nil {
		return 0, fmt.Errorf("Couldn't check for client: %w", err)
	}

	if id_client == 0 {
		fmt.Printf("Couldn't find client with email %s and name %s", client.Email_client, client.Name_client)
		id_client, err = s.CreateClient(ctx, client)

		if err != nil {
			return 0, fmt.Errorf("Couldn't create client while booking: %w", err)
		}
	}

	return id_client, nil
}



func (s *Storage) SelectRoom(ctx context.Context, room_type string, in_date_booking time.Time, out_date_booking time.Time) (int, int, float64, error) {
	var id_room int
	var id_hotel int
	var rate_per_night float64

	query := `SELECT r.id_room, r.room_rate_per_night, r.id_hotel
			FROM room r
            WHERE r.room_availability = true
			AND r.id_hotel = 42
			AND r.type_room = $1
			AND NOT EXISTS (
                SELECT 1 FROM booking b
                WHERE b.id_room = r.id_room
				AND b.type_room = $2
                AND $3 < b.out_date_booking AND $4 > b.in_date_booking
			)
			LIMIT 1`
	err := s.DB.QueryRowContext(ctx, query, room_type, room_type, in_date_booking, out_date_booking).Scan(&id_room, &rate_per_night, &id_hotel)
	if err != nil {
		return -1, -1, -1, fmt.Errorf("Couldn't get id_room, rate_per_night: %w", err)
	}

	return id_room, id_hotel, rate_per_night, nil
}

func (s *Storage) CreateBooking(ctx context.Context, booking *models.Booking, id_hotel int) (int64, error) {
	var id int64

	created_at := time.Now()

	query := `insert into Booking (id_client, id_room, type_room, in_date_booking, out_date_booking, price_of_booking, created_at) values ($1, $2, $3, $4, $5, $6, $7) returning id_booking`
	err := s.DB.QueryRowxContext(ctx, query, booking.ID_Client, booking.ID_Room, booking.Room_Type, booking.In_date_booking, booking.Out_date_booking, booking.Price_of_booking, created_at).Scan(&id)
	if err != nil {
		return -1, fmt.Errorf("Couldn't create booking: %w", err)
	}

	query = `update Client set id_hotel = $1 where id_client = $2`
	_, err = s.DB.ExecContext(ctx, query, id_hotel, booking.ID_Client)
	if err != nil {
		return -1, fmt.Errorf("Couldn't change room's availability while creating final booking: %w", err)
	}
	
	query = `update Room set room_availability = false where id_room = $1`
	_, err = s.DB.ExecContext(ctx, query, booking.ID_Room)
	if err != nil {
		return -1, fmt.Errorf("Couldn't change room's availability while creating final booking: %w", err)
	}


	return id, nil
}

func (s *Storage) GetBooking(ctx context.Context) ([]models.Booking, error) {
	var booking []models.Booking

	err := s.DB.SelectContext(ctx, &booking, "select * from Booking")
	if err != nil {
		return nil, fmt.Errorf("Couldn't get booking: %w", err)
	}

	return booking, nil
}

func (s *Storage) UpdateBooking(ctx context.Context, booking *models.Booking) error {
	query := `update Booking set id_client = :id_client, id_room = :id_room, type_room = :type_room in_date_booking = :in_date_booking, out_date_booking = :out_date_booking, price_of_booking = :price_of_booking where id_booking = :id_booking`
	_, err := s.DB.NamedExecContext(ctx, query, booking)
	if err != nil {
		return fmt.Errorf("Couldn't update an booking: %w", err)
	}

	return nil
}

func (s *Storage) GetBookingByID(ctx context.Context, id int) (*models.Booking, error) {
	var booking models.Booking
	query := `select * from Booking where id_booking = $1`
	
	err := s.DB.GetContext(ctx, &booking, query, id)
	if err != nil {
		return nil, fmt.Errorf("Couldn't get an booking with id = %d: %w", id, err)
	}

	return &booking, nil
}

func (s *Storage) GetTempBookingByID(ctx context.Context, id int) (*models.Booking, error) {
	var booking models.Booking
	query := `select * from temp_booking where id_booking = $1`
	
	err := s.DB.GetContext(ctx, &booking, query, id)
	if err != nil {
		return nil, fmt.Errorf("Couldn't get a temp_booking with id = %d: %w", id, err)
	}

	return &booking, nil
}

func (s *Storage) DeleteBooking(ctx context.Context, id_booking int) error {
	query := `UPDATE Room 
	SET room_availability = true 
	WHERE id_room IN (SELECT id_room FROM Booking WHERE id_booking = $1)`
	if _, err := s.DB.ExecContext(ctx, query, id_booking); err != nil {
		return fmt.Errorf("Couldn't delete an booking: %w", err)
	}
	
	query = `UPDATE Client 
	SET id_hotel = null 
	WHERE id_client IN (SELECT id_client FROM Booking WHERE id_booking = $1)`
	if _, err := s.DB.ExecContext(ctx, query, id_booking); err != nil {
		return fmt.Errorf("Couldn't delete an booking: %w", err)
	}

	query = `delete from Booking where id_booking = $1`
	if _, err := s.DB.ExecContext(ctx, query, id_booking); err != nil {
		return fmt.Errorf("Couldn't delete an booking: %w", err)
	}
	return nil
}

func (s *Storage) DeleteTempBooking(ctx context.Context, id_booking int) error {
	query := `delete from temp_booking where id_booking = $1`
	if _, err := s.DB.ExecContext(ctx, query, id_booking); err != nil {
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