import { Layout, Card, Space } from 'antd';
import { MinusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { generateDays } from './ComponentsCalendar/GenerationDays.tsx';
import { DatePickerInput } from './ComponentsCalendar/Card/DatePickerInput.tsx';
import { CalendarPopup } from './ComponentsCalendar/Popup/CalendarPopup.tsx';

type ActiveInputType = 'checkIn' | 'checkOut' | null;

interface BookingDates {
    checkIn: Date | null;
    checkOut: Date | null;
}

export let Booking_dates: BookingDates = {
    checkIn: null,
    checkOut: null
};

export const updateBookingDates = (newDates: Partial<BookingDates>) => {
    Booking_dates = { ...Booking_dates, ...newDates };
};

const contentStyle: React.CSSProperties = {
    alignItems: 'flex-start',
    marginTop: '230px',
    minHeight: 'calc(100vh - 64px)',
    backgroundColor: 'transparent',
    width: '100%',
};
type CalendarStyles = {
    pickerRange: React.CSSProperties;
    rangeSeparator: React.CSSProperties;
    minusIcon: React.CSSProperties;
    card: React.CSSProperties;
    input: React.CSSProperties;
    pickerInput: React.CSSProperties;
};

const calendarStyles: CalendarStyles = {
    pickerRange: {
        display: 'flex',
        justifyContent: 'center',
        backdropFilter: 'blur(0px)',
        alignItems: 'flex-start',
        height: '80px',
        position: 'relative'
    },
    rangeSeparator: {
        padding: '0 10px',
    },
    minusIcon: {
        color: '#fff',
        fontSize: '16px',
        margin: '0px 30px',
        transform: 'scaleX(5)'
    },
    card: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: '0px',
        border: 'none',
        height: '90px',
        padding: '5px',
        overflow: 'visible'
    },
    input: {
        textAlign: 'center',
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

const AppLayouts = () => {
    return (
        <Layout.Content style={contentStyle}>
            <CalendarComponent />
        </Layout.Content>
    );
};
export default AppLayouts;

const CalendarComponent: React.FC = () => {
    const [checkInDate, setCheckInDate] = useState<Date | null>(null);
    const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const [activeInput, setActiveInput] = useState<ActiveInputType>(null);
    const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

    const days = generateDays(currentMonth, currentYear);

    const handleDateClick = (date: Date | null) => {
        if (!date) return;

        if (activeInput === 'checkIn') {
            setCheckInDate(date);
            setActiveInput('checkOut');
        } else if (activeInput === 'checkOut') {
            if (checkInDate && date > checkInDate) {
                setCheckOutDate(date);
                setShowCalendar(false);
            }
        }
    };

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(prevYear => prevYear - 1);
        } else {
            setCurrentMonth(prevMonth => prevMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(prevYear => prevYear + 1);
        } else {
            setCurrentMonth(prevMonth => prevMonth + 1);
        }
    };

    const formatDate = (date: Date | null): string => {
        if (!date) return '';
        const monthNames = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
        return `${date.getDate()} ${monthNames[date.getMonth()]}`;
    };

    const monthNames = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];

    const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    return (
        <Card style={calendarStyles.card}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div style={calendarStyles.pickerRange}>
                    <DatePickerInput
                        placeholder="Заезд"
                        value={formatDate(checkInDate)}
                        onClick={() => {
                            setShowCalendar(true);
                            setActiveInput('checkIn');
                        }}
                        isSelected={!!checkInDate}
                        labelType={checkInDate ? 'checkIn' : null}
                        inputStyle={calendarStyles.input}
                        wrapperStyle={calendarStyles.pickerInput}
                    />
                    <MinusOutlined style={calendarStyles.minusIcon} />
                    <DatePickerInput
                        placeholder="Выезд"
                        value={formatDate(checkOutDate)}
                        onClick={() => {
                            if (checkInDate) {
                                setShowCalendar(true);
                                setActiveInput('checkOut');
                            }
                        }}
                        disabled={!checkInDate}
                        isSelected={!!checkOutDate}
                        labelType={checkOutDate ? 'checkOut' : null}
                        inputStyle={calendarStyles.input}
                        wrapperStyle={calendarStyles.pickerInput}
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
                        checkInDate={checkInDate}
                        checkOutDate={checkOutDate}
                        handleDateClick={handleDateClick}
                        handlePrevMonth={handlePrevMonth}
                        handleNextMonth={handleNextMonth}
                    />
                )}
            </Space>
        </Card>
    );
};