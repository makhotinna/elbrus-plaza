package main

import (
	"backend/internal/handlers"
	"backend/internal/storage/postgres"
	"log"
	"net/http"

	"github.com/go-pkgz/routegroup"
	"github.com/spf13/viper"
)

func EnableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func main() {

	viper.SetConfigName("config")
	viper.SetConfigType("yaml")
	viper.AddConfigPath(".")



	if err := viper.ReadInConfig(); err != nil {
		log.Fatalf("Ошибка чтения конфига: %v", err)
	}

	
	DBInfo := postgres.NewDBInfo(
		viper.GetString("database.host"),
		viper.GetInt("database.port"),
		viper.GetString("database.user"),
		viper.GetString("database.password"),
		viper.GetString("database.dbname"),
	)

	storage, err := DBInfo.Connect()
	if err != nil {
		log.Fatal(err)
	}
	defer storage.DB.Close()

	router := routegroup.New(http.NewServeMux())

	router.Use(func(h http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			log.Printf("Request: %s %s", r.Method, r.URL.Path)
			h.ServeHTTP(w, r)
		})
	})

	roomHandler := handlers.NewRoomHandler(storage)
	hotelHandler := handlers.NewHotelHandler(storage)
	eventsHandler := handlers.NewEventsHandler(storage)
	//bookingHandler := handlers.NewBookingHandler(storage)
	add_servHandler := handlers.NewAdd_ServHandler(storage)
	clientHandler := handlers.NewClientHandler(storage)
	
	roomHandler.RegisterRoutes(router)
	hotelHandler.RegisterRoutes(router)
	eventsHandler.RegisterRoutes(router)
	//bookingHandler.RegisterRoutes(router)
	add_servHandler.RegisterRoutes(router)
	clientHandler.RegisterRoutes(router)
	
	if err := http.ListenAndServe(":8787", EnableCORS(router)); err != nil {
		panic(err)
	}
}
