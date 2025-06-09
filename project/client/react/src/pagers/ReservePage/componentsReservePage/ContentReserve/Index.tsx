import React, { useState } from 'react';
import { Card, Space, Button, Typography, Dropdown, Menu, Divider, Checkbox } from 'antd';
import { DatePickerInput } from './DatePickerInput';
import { CalendarPopup } from './CalendarPopup';
import { generateDays } from './GenerationDays';

const { Text, Paragraph } = Typography;

type ActiveInputType = 'checkIn' | 'checkOut' | null;
type GuestType = { age: string };

const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
};

const cardStyle: React.CSSProperties = {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    padding: '24px',
    width: '100%',
    maxWidth: '600px',
};

const CalendarComponent: React.FC = () => {
    // Состояния для управления датами
    const [checkInDate, setCheckInDate] = useState<Date | null>(null);
    const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [activeInput, setActiveInput] = useState<ActiveInputType>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [includeLoyaltyCard, setIncludeLoyaltyCard] = useState(false); // Новое состояние для галочки

    // Состояния для управления гостями
    const [adultsCount, setAdultsCount] = useState(2);
    const [children, setChildren] = useState<GuestType[]>([]);
    const [dropdownVisible, setDropdownVisible] = useState({
        adults: false,
        children: false
    });

    const days = generateDays(currentMonth, currentYear);
    const totalGuests = adultsCount + children.length;

    // Данные для выбора
    const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    const childrenAges = [
        'до 1 года', '1 год', '2 года', '3 года', '4 года', '5 лет',
        '6 лет', '7 лет', '8 лет', '9 лет', '10 лет', '11 лет', '12 лет', '13 лет'
    ];

    // Обработчики для календаря
    const handleDateClick = (date: Date | null) => {
        if (!date) return;

        if (activeInput === 'checkIn') {
            setCheckInDate(date);
            setActiveInput('checkOut');
        } else if (activeInput === 'checkOut' && checkInDate && date > checkInDate) {
            setCheckOutDate(date);
            setShowCalendar(false);
        }
    };

    const handleMonthChange = (direction: 'prev' | 'next') => {
        setCurrentMonth(prev => {
            if (direction === 'prev') {
                return prev === 0 ? 11 : prev - 1;
            }
            return prev === 11 ? 0 : prev + 1;
        });

        if (direction === 'prev' && currentMonth === 0) {
            setCurrentYear(prev => prev - 1);
        } else if (direction === 'next' && currentMonth === 11) {
            setCurrentYear(prev => prev + 1);
        }
    };

    const formatDate = (date: Date | null): string => {
        if (!date) return '';
        const monthNames = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
        return `${date.getDate()} ${monthNames[date.getMonth()]}`;
    };

    // Обработчики для гостей
    const handleAdultsSelect = (count: number) => {
        setAdultsCount(count);
        setDropdownVisible({ ...dropdownVisible, adults: false });
    };

    const handleAddChild = (age: string) => {
        if (totalGuests < 8) {
            setChildren([...children, { age }]);
        }
        setDropdownVisible({ ...dropdownVisible, children: false });
    };

    const removeChild = (index: number) => {
        setChildren(children.filter((_, i) => i !== index));
    };

    // Меню для выбора
    const adultsMenu = (
        <Menu>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <Menu.Item
                    key={num}
                    onClick={() => handleAdultsSelect(num)}
                    disabled={num + children.length > 8}
                >
                    {num} взросл{num === 1 ? 'ый' : 'ых'}
                </Menu.Item>
            ))}
        </Menu>
    );

    const childrenMenu = (
        <Menu>
            {childrenAges.map((age, index) => (
                <Menu.Item
                    key={index}
                    onClick={() => handleAddChild(age)}
                    disabled={totalGuests >= 8}
                >
                    Ребёнок {age}
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <div style={containerStyle}>
            <Card style={cardStyle}>
                {/* Заголовки дат */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '220px' }}>
                    <div style={{ fontSize: '16px', color: '#333' }}>
                        Дата заезда
                    </div>
                    <div style={{ fontSize: '16px', color: '#333' }}>
                        Дата выезда
                    </div>
                </div>

                {/* Поля выбора дат */}
                <Space size={16} style={{ justifyContent: 'space-between', width: '100%' }}>
                    <DatePickerInput
                        placeholder=" "
                        value={formatDate(checkInDate)}
                        onClick={() => {
                            setShowCalendar(true);
                            setActiveInput('checkIn');
                        }}
                    />
                    <DatePickerInput
                        placeholder=" "
                        value={formatDate(checkOutDate)}
                        onClick={() => {
                            if (checkInDate) {
                                setShowCalendar(true);
                                setActiveInput('checkOut');
                            }
                        }}
                        disabled={!checkInDate}
                    />
                </Space>

                <Divider style={{ margin: '16px 0' }} />

                {/* Блок выбора гостей */}
                <Space direction="vertical" size={16} style={{ width: '100%' }}>
                    <Paragraph
                        style={{
                            textAlign: 'center',
                            marginBottom: 0,
                            fontSize: '20px',
                            fontWeight: 500
                        }}
                    >
                        Размещение в номере
                    </Paragraph>
                    {/* Выбор взрослых */}
                    <Dropdown
                        overlay={adultsMenu}
                        trigger={['click']}
                        visible={dropdownVisible.adults}
                        onVisibleChange={visible => setDropdownVisible({ ...dropdownVisible, adults: visible })}
                    >
                        <Button
                            type="text"
                            style={{ width: '100%', textAlign: 'center', padding: '8px 0', border: '1px solid #383B52' }}
                        >
                            {adultsCount} взросл{adultsCount === 1 ? 'ый' : 'ых'}
                        </Button>
                    </Dropdown>

                    {/* Добавление детей */}
                    <Dropdown
                        overlay={childrenMenu}
                        trigger={['click']}
                        visible={dropdownVisible.children}
                        onVisibleChange={visible => setDropdownVisible({ ...dropdownVisible, children: visible })}
                        disabled={totalGuests >= 8}
                    >
                        <Button
                            type="text"
                            style={{ color: '#000', width: '100%', textAlign: 'center', padding: '8px 0', border: '1px solid #383B52' }}
                        >
                            + Добавить ребёнка
                        </Button>
                    </Dropdown>

                    {/* Список детей */}
                    {children.map((child, index) => (
                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                            <Text>Ребёнок {child.age}</Text>
                            <Button type="text" danger onClick={() => removeChild(index)} size="small">
                                Удалить
                            </Button>
                        </div>
                    ))}

                    <Text type="secondary" style={{ textAlign: 'center', fontSize: '12px' }}>
                        *Ребёнком считается лицо, не достигшее 14-летнего возраста
                    </Text>
                </Space>

                {/* Блок с галочкой лояльности */}
                <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center' }}>
                    <Checkbox 
                        checked={includeLoyaltyCard}
                        onChange={(e) => setIncludeLoyaltyCard(e.target.checked)}
                        style={{ marginRight: '8px' }}
                    />
                    <Text>Посчитать цену с учетом карты лояльности</Text>
                </div>

                {/* Попап календаря */}
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
                        handlePrevMonth={() => handleMonthChange('prev')}
                        handleNextMonth={() => handleMonthChange('next')}
                    />
                )}
            </Card>
        </div>
    );
};

export default CalendarComponent;