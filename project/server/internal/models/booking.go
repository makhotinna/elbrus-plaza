package models

import "time"

type Booking struct {
	ID_Booking int `db:"id_booking"`
	ID_Client int `db:"id_client"`
	ID_Room int `db:"id_room"`
	Room_Type string `db:"room_type"`
	In_date_booking	time.Time `db:"in_date_booking"`
	Out_date_booking time.Time `db:"out_date_booking"`
	Price_of_booking int `db:"price_of_booking"`
	//Status_booking string `db:"status_booking"`
	//Status_payment string `db:"status_payment"`
	Created_At time.Time `db:"created_at"`
}