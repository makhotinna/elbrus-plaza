import React, { useState } from 'react';
import { Layout, Card, Space } from 'antd';
import { MinusOutlined } from '@ant-design/icons';
import { generateDays } from './ComponentsCalendar/GenerationDays';
import { DatePickerInput } from './ComponentsCalendar/Card/DatePickerInput';
import { CalendarPopup } from './ComponentsCalendar/Popup/CalendarPopup';
import { CSSProperties } from 'react';
import { useBooking } from '../../../contexts/BookingContext';

const { Content } = Layout;

type ActiveInputType = 'checkIn' | 'checkOut' | null;

const styles: {
  content: CSSProperties;
  card: CSSProperties;
  pickerRange: CSSProperties;
  minusIcon: CSSProperties;
  input: CSSProperties;
  pickerInput: CSSProperties;
} = {
  content: {
    alignItems: 'flex-start',
    marginTop: '230px',
    minHeight: 'calc(100vh - 64px)',
    backgroundColor: 'transparent',
    width: '100%',
  },
  card: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '0px',
    border: 'none',
    height: '90px',
    padding: '5px',
    overflow: 'visible'
  },
  pickerRange: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '80px',
    position: 'relative' as 'relative' 
  },
  minusIcon: {
    color: '#fff',
    fontSize: '16px',
    margin: '0px 30px',
    transform: 'scaleX(5)'
  },
  input: {
    textAlign: 'center' as 'center', 
    width: '175px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#fff',
    outline: 'none',
    padding: '5px 0'
  },
  pickerInput: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    transform: 'translateY(-12px)'
  }
};

const CalendarComponent: React.FC = () => {
  const { bookingData, setBookingDates, formatDate } = useBooking();
  const [showCalendar, setShowCalendar] = useState(false);
  const [activeInput, setActiveInput] = useState<ActiveInputType>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const days = generateDays(currentMonth, currentYear);

  const handleDateClick = (date: Date | null) => {
    if (!date) return;

    if (activeInput === 'checkIn') {
      setBookingDates(date, bookingData.Out_date_booking);
      setActiveInput('checkOut');
    } else if (activeInput === 'checkOut' && bookingData.In_date_booking && date > bookingData.In_date_booking) {
      setBookingDates(bookingData.In_date_booking, date);
      setShowCalendar(false);
    }
  };

  const handleMonthChange = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = direction === 'prev' ? prev - 1 : prev + 1;
      if (newMonth < 0) {
        setCurrentYear(year => year - 1);
        return 11;
      }
      if (newMonth > 11) {
        setCurrentYear(year => year + 1);
        return 0;
      }
      return newMonth;
    });
  };

  const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 
                     'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  return (
    <Content style={styles.content}>
      <Card style={styles.card}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={styles.pickerRange}>
            <DatePickerInput
              placeholder="Заезд"
              value={formatDate(bookingData.In_date_booking)}
              onClick={() => {
                setShowCalendar(true);
                setActiveInput('checkIn');
              }}
              isSelected={!!bookingData.In_date_booking}
              labelType={bookingData.In_date_booking ? 'checkIn' : null}
              inputStyle={styles.input}
              wrapperStyle={styles.pickerInput}
            />
            <MinusOutlined style={styles.minusIcon} />
            <DatePickerInput
              placeholder="Выезд"
              value={formatDate(bookingData.Out_date_booking)}
              onClick={() => bookingData.In_date_booking && setShowCalendar(true) && setActiveInput('checkOut')}
              disabled={!bookingData.In_date_booking}
              isSelected={!!bookingData.Out_date_booking}
              labelType={bookingData.Out_date_booking ? 'checkOut' : null}
              inputStyle={styles.input}
              wrapperStyle={styles.pickerInput}
            />
          </div>

          {showCalendar && (
            <CalendarPopup
              showCalendar={showCalendar}
              currentMonth={currentMonth}
              currentYear={currentYear}
              monthNames={monthNames}
              weekDays={weekDays}
              days={days}
              checkInDate={bookingData.In_date_booking}
              checkOutDate={bookingData.Out_date_booking}
              handleDateClick={handleDateClick}
              handlePrevMonth={() => handleMonthChange('prev')}
              handleNextMonth={() => handleMonthChange('next')}
            />
          )}
        </Space>
      </Card>
    </Content>
  );
};

export default CalendarComponent;