package postgres

import (
	"backend/internal/models"
	"context"
	"fmt"
)

func (s *Storage) GetAdditional_services(ctx context.Context) ([]models.Additional_services, error) {
    var a_s []models.Additional_services

    err := s.DB.SelectContext(ctx, &a_s, "SELECT * FROM Additional_services")
    if err != nil {
        return nil, fmt.Errorf("failed to get additional services: %w", err)
    }

    return a_s, nil
}


func (s *Storage) CreateAdditional_services(ctx context.Context, a_s *models.Additional_services) (int64, error) {
	var id int64

	query := `insert into Additional_services (name_additional, price_additional) values ($1, $2) returning id_additional`
	err := s.DB.QueryRowContext(ctx, query, a_s.Name_Additional, a_s.Price_Additional).Scan(&id)
	if err != nil {
		return -1, fmt.Errorf("Couldn't create an additional service: %w", err)
	}

	return id, nil
}

func (s *Storage) UpdateAdditional_services(ctx context.Context, a_s *models.Additional_services) error {
	query := `update Additional_services set name_additional = :name_additional, price_additional = :price_additional where id_additional = :id_additional`
	_, err := s.DB.NamedExecContext(ctx, query, a_s)
	if err != nil {
		return fmt.Errorf("Couldn't update an additional services: %w", err)
	}

	return nil
}

func (s *Storage) GetAdditional_servicesByID(ctx context.Context, id int) (*models.Additional_services, error) {
	var a_s models.Additional_services
	query := `select * from Additional_services where id_additional = $1`
	
	err := s.DB.GetContext(ctx, &a_s, query, id)
	if err != nil {
		return nil, fmt.Errorf("Couldn't get an additional services with id = %d: %w", id, err)
	}

	return &a_s, nil
}

func (s *Storage) DeleteAdditional_services(ctx context.Context, id int) error {
	query := `delete from Additional_services where id_additional = $1`
	if _, err := s.DB.ExecContext(ctx, query, id); err != nil {
		return fmt.Errorf("Couldn't delete an additional service: %w", err)
	}
	return nil
}