package models

import "time"

type Events struct {
	ID_Events          int	`db:"id_events"`
	ID_Hotel           int	`db:"id_hotel"`
	Name_events        string	`db:"name_events"`
	Description_events string	`db:"description_events"`
	Start_date_events  time.Time	`db:"start_date_events"`
	End_date_events time.Time	`db:"end_date_events"`
	Location_event string	`db:"location_event"`
	Price_events int	`db:"price_events"`
	Number_of_available_seats int	`db:"number_of_available_seats"`
	Status_events string	`db:"status_events"`
}