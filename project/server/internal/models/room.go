package models

type Room struct {
	ID_Room	int	`db:"id_room"`
	ID_Hotel	int	`db:"id_hotel"`
	Number_room	int	`db:"number_room"`
	Type_room	string	`db:"type_room"`
	Number_of_beds	int	`db:"number_of_beds"`
	Room_Availability	bool	`db:"room_availability"`
	Room_rate_per_night	float32	`db:"room_rate_per_night"`
	View_from_the_windows	string	`db:"view_from_the_windows"`
	Accessibility_for_people_with_disabilities	bool	`db:"accessibility_for_people_with_disabilities"`
	Extra_sleeping_place	bool	`db:"extra_sleeping_place"`
}
