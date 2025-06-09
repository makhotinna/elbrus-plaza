package postgres

import (
	"backend/internal/models"
	"context"
	"fmt"
)

func (s *Storage) GetClients(ctx context.Context) ([]models.Client, error) {
	var clients []models.Client

	err := s.DB.SelectContext(ctx, &clients, "select * from Client")
	if err != nil {
		return nil, fmt.Errorf("Couldn't get Client: %w", err)
	}

	return clients, nil
}


func (s *Storage) CreateClient(ctx context.Context, client *models.Client) (int64, error) {
	var id int64

	//query := `insert into Client (id_hotel, name_client, email_client, phone_client, password_client) values ($1, $2, $3, $4, $5) returning id_client`
	//err := s.DB.QueryRowContext(ctx, query, client.ID_Hotel, client.Name_client, client.Email_client, client.Phone_client, client.Password_client).Scan(&id)
	query := `insert into Client (id_hotel, name_client, email_client, phone_client) values ($1, $2, $3, $4) returning id_client`
	err := s.DB.QueryRowContext(ctx, query, client.ID_Hotel, client.Name_client, client.Email_client, client.Phone_client).Scan(&id)
	
	if err != nil {
		return -1, fmt.Errorf("Couldn't create an client: %w", err)
	}

	return id, nil
}

func (s *Storage) UpdateClient(ctx context.Context, client *models.Client) error {
	//query := `update Client set id_hotel = :id_hotel, name_client = :name_client, email_client = :email_client, phone_client = :phone_client, password_client = :password_client where id_client = :id_client`
	query := `update Client set id_hotel = :id_hotel, name_client = :name_client, email_client = :email_client, phone_client = :phone_client where id_client = :id_client`
	
	_, err := s.DB.NamedExecContext(ctx, query, client)
	if err != nil {
		return fmt.Errorf("Couldn't update an client: %w", err)
	}

	return nil
}

func (s *Storage) GetClientByID(ctx context.Context, id int) (*models.Client, error) {
	var client models.Client
	query := `select * from Client where id_client = $1`
	
	err := s.DB.GetContext(ctx, &client, query, id)
	if err != nil {
		return nil, fmt.Errorf("Couldn't get an client with id = %d: %w", id, err)
	}

	return &client, nil
}

func (s *Storage) DeleteClient(ctx context.Context, id int) error {
	query := `delete from Client where id_client = $1`
	if _, err := s.DB.ExecContext(ctx, query, id); err != nil {
		return fmt.Errorf("Couldn't delete an client with id = %d: %w", id, err)
	}
	return nil
}