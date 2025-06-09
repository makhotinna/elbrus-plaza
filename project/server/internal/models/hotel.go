package models

type Hotel struct {
	ID_Hotel	int	`db:"id_hotel"`
	Name_hotel	string	`db:"name_hotel"`
	Adress_hotel	string	`db:"adress_hotel"`
	Phone_hotel	string	`db:"phone_hotel"`
	Rating_hotel	*float64	`db:"rating_hotel"`
	Description_hotel	string	`db:"description_hotel"`
	Email_hotel	string	`db:"email_hotel"`
}