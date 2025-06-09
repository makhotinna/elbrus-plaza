import { Card, Button } from 'antd';
import React from 'react';

interface BorderStyle {
  width?: string;
  border?: string;
  borderRadius?: string;
  boxShadow?: string;
}

interface CalendarPopupProps {
  showCalendar: boolean;
  currentMonth: number;
  currentYear: number;
  monthNames: string[];
  weekDays: string[];
  days: (Date | null)[];
  checkInDate: Date | null;
  checkOutDate: Date | null;
  handleDateClick: (date: Date | null) => void;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  borderStyle?: BorderStyle;
}

export const CalendarPopup: React.FC<CalendarPopupProps> = ({
  showCalendar,
  currentMonth,
  currentYear,
  monthNames,
  weekDays,
  days,
  checkInDate,
  checkOutDate,
  handleDateClick,
  handlePrevMonth,
  handleNextMonth,
  borderStyle = {
    width: '350px',
  }
}) => {
  if (!showCalendar) return null;

  return (
    <Card
      className="calendar-popup"
      style={{
        marginTop: '-310px', //-400
        background: '#EBEBEB',
        color: '#000',
        width: borderStyle.width,
        border: borderStyle.border,
        borderRadius: borderStyle.borderRadius,
        boxShadow: borderStyle.boxShadow,
        marginLeft: '-360px', //-30
      }}
    >
      <div className="calendar-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '-5px' }}>
        <Button type="text" onClick={handlePrevMonth}>
          &lt;
        </Button>
        <h4 style={{ margin: 0 }}>{monthNames[currentMonth]} {currentYear}</h4>
        <Button type="text" onClick={handleNextMonth}>
          &gt;
        </Button>
      </div>

      <div className="calendar-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px' }}>
        {weekDays.map(day => (
          <div key={day} style={{ textAlign: 'center', fontWeight: 'bold', padding: '0px' }}>
            {day}
          </div>
        ))}

        {days.map((date, index) => {
          const isSelected = (checkInDate && date?.getTime() === checkInDate.getTime()) ||
            (checkOutDate && date?.getTime() === checkOutDate.getTime());
          const isInRange = checkInDate && checkOutDate && date &&
            date > checkInDate && date < checkOutDate;

          return (
            <div
              key={index}
              className={`calendar-day ${!date ? 'empty' : ''}`}
              style={{
                padding: '5px',
                textAlign: 'center',
                cursor: date ? 'pointer' : 'default',
                borderRadius: '0px',
                backgroundColor: isSelected ? '#161F23' :
                  isInRange ? '#AFAFAF' : 'transparent',
                color: isSelected ? '#fff' : '#000'
              }}
              onClick={() => handleDateClick(date)}
            >
              {date?.getDate()}
            </div>
          );
        })}
      </div>
    </Card>
  );
};