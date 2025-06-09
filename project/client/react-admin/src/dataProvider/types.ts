import { RaRecord } from 'react-admin';

export interface Hotel extends RaRecord {
  id: number;
  name_hotel: string;
  adress_hotel: string;
  phone_hotel: string;
  rating_hotel: number;
  description_hotel?: string;
  email_hotel: string;
}

export interface Room extends RaRecord {
  ID_Room: number;
  ID_Hotel: number;
  Number_room: number;
  Type_room: string;
  Number_of_beds: number;
  Room_Availability: boolean;
  Room_rate_per_night: number;
  View_from_the_windows?: string;
  Accessibility_for_people_with_disabilities: boolean;
  Extra_sleeping_place: boolean;
}

export interface Booking extends RaRecord {
    id: number;
    ID_booking: number;
    ID_client: number;
    ID_Hotel: number;
    ID_room: number;
    In_date_booking: string;
    Out_day_booking: string;
    Price_of_booking: number;
    Status_booking: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    Status_payment: 'unpaid' | 'paid' | 'partially_paid' | 'refunded';
}

export interface Client extends RaRecord {
    id: number;
    ID_client: number;
    ID_Hotel: number;
    Name_client: string;
    Email_client: string;
    Phone_client: string;
    Password_client: string;
    Points_balance: number;
}
