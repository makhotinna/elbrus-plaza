import { Card, Button } from 'antd';
import React from 'react';

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
  handleNextMonth
}) => {
  if (!showCalendar) return null;

  return (
    <Card
      style={{
        position: 'absolute',
        zIndex: 1000,
        width: '350px',
        marginTop: '-540px',
        marginLeft: '90px',
        boxShadow: '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <Button type="text" onClick={handlePrevMonth} style={{ padding: '0' }}>
          &lt;
        </Button>
        <div style={{ fontWeight: '500' }}>{monthNames[currentMonth]} {currentYear}</div>
        <Button type="text" onClick={handleNextMonth} style={{ padding: '0' }}>
          &gt;
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
        {weekDays.map(day => (
          <div key={day} style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '12px' }}>
            {day}
          </div>
        ))}

        {days.map((date, index) => {
          const isSelected = (checkInDate && date?.getTime() === checkInDate.getTime()) ||
            (checkOutDate && date?.getTime() === checkOutDate.getTime());
          const isInRange = checkInDate && checkOutDate && date &&
            date > checkInDate && date < checkOutDate;

          return (
            <Button
              key={index}
              type="text"
              style={{
                width: '32px',
                height: '32px',
                padding: '0',
                borderRadius: '4px',
                backgroundColor: isSelected ? '#1890ff' : isInRange ? '#e6f7ff' : 'transparent',
                color: isSelected ? '#fff' : '#000',
                border: isInRange ? '1px solid #91d5ff' : 'none'
              }}
              onClick={() => handleDateClick(date)}
              disabled={!date}
            >
              {date?.getDate()}
            </Button>
          );
        })}
      </div>
    </Card>
  );
};