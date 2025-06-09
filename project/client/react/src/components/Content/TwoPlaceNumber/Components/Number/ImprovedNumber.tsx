import React from 'react';
import BaseNumber from './BaseNumber';
import CarouselImproved from '../CarouselImprove';
import { Button, ConfigProvider, message } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useBooking } from '../../../../../contexts/BookingContext';


const ImprovedNumber: React.FC = () => {
  const navigate = useNavigate();
  const { bookingData } = useBooking();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id_temp_booking = searchParams.get('id_temp_booking');

  const handleReserveClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!bookingData.In_date_booking || !bookingData.Out_date_booking) {
      message.error('Сначала выберите даты в календаре');
      return;
    }

    if (bookingData.Out_date_booking <= bookingData.In_date_booking) {
      message.error('Дата выезда должна быть позже даты заезда');
      return;
    }

    try {
      const url = id_temp_booking
        ? `http://26.118.5.15:8787/api/bookings/temp/${id_temp_booking}`
        : 'http://26.118.5.15:8787/api/bookings/temp';

      const method = id_temp_booking ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          In_date_booking: bookingData.In_date_booking.toISOString(),
          Out_date_booking: bookingData.Out_date_booking.toISOString(),
          Room_type: 'улучшенный двухместный'
        }),
      });


      if (!response.ok) throw new Error(await response.text());

      const data = await response.json();
      console.log(data);
      navigate(`/bookingform?id_temp_booking=${data.id_temp_booking}`);

    } catch (error) {
      message.error('Ошибка бронирования: ' + (error instanceof Error ? error.message : 'Неизвестная ошибка'));
      console.error('Booking error:', error);
    }
  };

  return (
    <BaseNumber
      CarouselComponent={CarouselImproved}
      description={
        <>
          Этот уютный двухместный номер, оформленный в лучших традициях <br />
          кавказского гостеприимства. Из окна открывается величественный вид <br />
          на заснеженные склоны Эльбруса...
          <br /><br />
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimary: '#383B52',
                  colorPrimaryHover: '#E3D9D4',
                  colorTextLightSolid: '#ffffff',
                  colorPrimaryTextHover: '#000000',
                },
              },
            }}
          >
            <Button
              type="primary"
              size="large"
              onClick={handleReserveClick}
              disabled={!bookingData.In_date_booking || !bookingData.Out_date_booking}
            >
              {id_temp_booking ? 'Обновить бронь' : 'Забронировать'}
            </Button>
          </ConfigProvider>
        </>
      }
    />
  );
};

export default ImprovedNumber;