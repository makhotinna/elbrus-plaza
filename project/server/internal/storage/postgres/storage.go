package postgres

import (
	"fmt"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

type Storage struct {
	DB *sqlx.DB
}

type DBInfo struct {
	Host     string
	Port     int
	User     string
	Password string
	DBName   string
}

func NewDBInfo(host string, port int, user, password, dbname string) *DBInfo {
	return &DBInfo{
		Host:     host,
		Port:     port,
		User:     user,
		Password: password,
		DBName:   dbname,
	}
}

func (d *DBInfo) Connect() (*Storage, error) {
	connStr := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		d.Host, d.Port, d.User, d.Password, d.DBName)

	db, err := sqlx.Connect("postgres", connStr)
	if err != nil {
		return nil, err
	}

	return &Storage{DB: db}, nil
}
