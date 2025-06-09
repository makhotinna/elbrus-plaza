import { RaRecord } from "ra-core";

export interface Hotel extends RaRecord {
    ID_Hotel: number;
    Name_hotel: string;
    Adress_hotel: string;
    Phone_hotel: string;
    Rating_hotel?: number | null;
    Description_hotel: string;
    Email_hotel: string;
}

export interface Room extends RaRecord {
	ID_Room: number
	ID_Hotel: number
	Number_room: number
	Type_room: string
	Number_of_beds: number
	Room_Availability: boolean
	Room_rate_per_night: number
	View_from_the_windows: string
	Accessibility_for_people_with_disabilities: boolean
	Extra_sleeping_place: boolean
}

export interface Client {
	ID_Client: number
	ID_Hotel: number
	Name_client: string
	Email_client: string
	Phone_client: string
	Password_client: string
	Points_balance: number
}