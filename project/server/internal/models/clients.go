package models

type Client struct {
	ID_Client int	`db:"id_client"`
	ID_Hotel int	`db:"id_hotel"`
	Name_client string	`db:"name_client"`
	Email_client string	`db:"email_client"`
	Phone_client string	`db:"phone_client"`
	//Password_client string	`db:"password_client"`
	Points_balance int	`db:"points_balance"`
}