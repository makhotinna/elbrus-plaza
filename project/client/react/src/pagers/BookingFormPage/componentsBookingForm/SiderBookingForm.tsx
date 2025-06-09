import Layout from 'antd/es/layout';
import Typography from 'antd/es/typography';
import Divider from 'antd/es/divider';
import Spin from 'antd/es/spin';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const layoutStyle: React.CSSProperties = {
    width: '100%',
    minHeight: '100vh',
    padding: '24px',
    backgroundColor: '#fff',
};

const contentStyle: React.CSSProperties = {
    color: '#000',
    lineHeight: '1.5',
    textAlign: 'left', 
};

const priceStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '16px 0px',
    textAlign: 'left', 
};

type BookingDetails = {
    nights: number;
    In_date_booking: string; 
    Out_date_booking: string; 
    checkInTime: string;
    checkOutTime: string;
    roomType: string;
    Price_of_booking: number; 
    totalPrice: number;
    bookingNumber?: string; 
};

const SiderBookingForm: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
    const [error, setError] = useState<string | null>(null);
    
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id_temp_booking = searchParams.get('id_temp_booking');

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                if (!id_temp_booking) {
                    throw new Error('ID бронирования не найден в URL');
                }

                const response = await fetch(`http://26.118.5.15:8787/api/bookings/temp/${id_temp_booking}`);
                console.log(response)

                if (!response.ok) {
                    throw new Error(`Ошибка HTTP: ${response.status}`);
                }

                const data = await response.json();
                console.log(data.Room_Type)
                
                if (!data.In_date_booking || !data.Out_date_booking) {
                    throw new Error('Неполные данные бронирования');
                }

                const inDate = new Date(data.In_date_booking);
                const outDate = new Date(data.Out_date_booking);
                const nights = Math.ceil((outDate.getTime() - inDate.getTime()) / (1000 * 60 * 60 * 24));

                setBookingDetails({
                    nights,
                    In_date_booking: dayjs(data.In_date_booking).format('DD.MM.YYYY'),
                    Out_date_booking: dayjs(data.Out_date_booking).format('DD.MM.YYYY'),
                    checkInTime: '14:00', 
                    checkOutTime: '12:00',
                    roomType: data.Room_Type || 'двухместный стандарт',
                    Price_of_booking: data.Price_of_booking || 5000, 
                    totalPrice: (data.Price_of_booking || 5000) * nights,
                    bookingNumber: data.booking_id || data.id_temp_booking 
                });
                
            } catch (err) {
                console.error('Ошибка при загрузке данных бронирования:', err);
                setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
            } finally {
                setLoading(false);
            }
        };

        fetchBookingDetails();
    }, [id_temp_booking]); 

    if (loading) return <Spin size="large" />;
    if (error) return <Text type="danger">{error}</Text>;
    if (!bookingDetails) return <Text>Данные бронирования не найдены</Text>;

    return (
        <Layout style={layoutStyle}>
            <Layout.Content style={contentStyle}>
                <Title level={2} style={{ textAlign: 'left' }}>Ваше бронирование</Title>
                
                {bookingDetails.bookingNumber && (
                    <Text strong style={{ display: 'block', marginBottom: '16px' }}>
                        Номер бронирования: {bookingDetails.bookingNumber}
                    </Text>
                )}

                <div style={{
                    width: '100%',
                    height: '10px',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <Title
                        level={4}
                        style={{
                            textAlign: 'left',
                            width: '100%',
                            fontSize: '25px', 
                            marginLeft: '0px',
                            padding: 0
                        }}
                    >
                        {bookingDetails.nights} {bookingDetails.nights === 1 ? 'ночь' : 'ночи'}
                    </Title>
                </div>
                <Divider />
                <Text>{bookingDetails.In_date_booking} — {bookingDetails.Out_date_booking}</Text><br />
                <Text>С {bookingDetails.checkInTime} ДО {bookingDetails.checkOutTime}</Text>

                <Divider />

                <Title level={4} style={{ textAlign: 'left' }}>
                    Цена номера за ночь: {bookingDetails.Price_of_booking.toLocaleString('ru-RU')} ₽
                </Title>
                <Text>
                    <strong>{bookingDetails.roomType}</strong>
                </Text>

                <Divider />

                <Title level={4} style={{ textAlign: 'left' }}>Услуги</Title>

                <Divider />

                <Text style={priceStyle}>
                    Итого: {bookingDetails.totalPrice.toLocaleString('ru-RU')} ₽
                </Text>
            </Layout.Content>
        </Layout>
    );
};

export default SiderBookingForm;