import React, { createContext, useState, useContext, useCallback } from 'react';
import { message } from 'antd';
import dayjs from 'dayjs';

interface BookingData {
  In_date_booking: Date | null;
  Out_date_booking: Date | null;
  Room_type?: string;
  lastSync?: Date | null;
}

interface BookingContextType {
  bookingData: BookingData;
  setBookingDates: (In_date_booking: Date | null, Out_date_booking: Date | null) => void;
  saveBookingDraft: () => Promise<void>;
  confirmBooking: () => Promise<void>;
  formatDate: (date: Date | null) => string;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookingData, setBookingData] = useState<BookingData>({
    In_date_booking: null,
    Out_date_booking: null,
    lastSync: null
  });

  const setBookingDates = useCallback((In_date_booking: Date | null, Out_date_booking: Date | null) => {
    setBookingData(prev => ({
      ...prev,
      In_date_booking,
      Out_date_booking
    }));
  }, []);

  const saveBookingDraft = useCallback(async () => {
    if (!bookingData.In_date_booking || !bookingData.Out_date_booking) {
      message.error('Пожалуйста, выберите даты заезда и выезда');
      return;
    }

    try {
      const response = await fetch('/api/bookings/temp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          In_date_booking: bookingData.In_date_booking.toISOString(),
          Out_date_booking: bookingData.Out_date_booking.toISOString()
        })
      });

      if (!response.ok) throw new Error('Ошибка сервера');

      setBookingData(prev => ({ ...prev, lastSync: new Date() }));
      message.success('Даты успешно сохранены!');
    } catch (error) {
      message.error('Ошибка при сохранении данных');
      console.error('Save error:', error);
    }
  }, [bookingData]);

  const confirmBooking = useCallback(async () => {
    if (!bookingData.In_date_booking || !bookingData.Out_date_booking) {
      message.error('Пожалуйста, сначала выберите даты');
      return;
    }

    try {
      const response = await fetch('http://26.118.5.15:8787/api/bookings/temp', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          In_date_booking: bookingData.In_date_booking.toISOString(),
          Out_date_booking: bookingData.Out_date_booking.toISOString(),
          Room_type: bookingData.Room_type
        })
      });

      if (!response.ok) throw new Error('Ошибка бронирования');

      message.success('Бронирование подтверждено!');
      return await response.json();
    } catch (error) {
      message.error('Ошибка при бронировании');
      console.error('Booking error:', error);
      throw error;
    }
  }, [bookingData]);

  const formatDate = useCallback((date: Date | null): string => {
    return date ? dayjs(date).format('DD MMM') : '';
  }, []);

  return (
    <BookingContext.Provider value={{ 
      bookingData, 
      setBookingDates,
      saveBookingDraft,
      confirmBooking,
      formatDate
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};