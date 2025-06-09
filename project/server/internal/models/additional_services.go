package models

type Additional_services struct {
    ID_Additional    int     `json:"ID_Additional" db:"id_additional"`
    Name_Additional  string  `json:"Name_Additional" db:"name_additional"`
    Price_Additional float64 `json:"Price_Additional" db:"price_additional"`
}