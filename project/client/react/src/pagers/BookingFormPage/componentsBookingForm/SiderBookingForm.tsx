import Layout from 'antd/es/layout'; // Layout - default import
import Typography from 'antd/es/typography'; // Typography - default import
import Divider from 'antd/es/divider'; // Divider - default import
import Spin from 'antd/es/spin'; // Spin - default import
import { useEffect, useState } from 'react';

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
    nights: number; //кол-во ночей
    In_date_booking: string; 
    Out_date_booking: string; 
    checkInTime: string; //? c 14:00 до 12:00
    checkOutTime: string;
    roomType: string; //берем оттуда, откуда добавляли
    Price_of_booking: number; 
    totalPrice: number; //окончательная стоимость
};

const SiderBookingForm: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await fetch('http://localhost:8787/api/booking-details');
                if (!response.ok) {
                    throw new Error('Ошибка при получении данных');
                }
                const data = await response.json();
                setBookingDetails({
                    In_date_booking: data.checkIn,
                    Out_date_booking: data.checkOut,
                    checkInTime: data.checkInTime,
                    checkOutTime: data.checkOutTime,
                    room_type: data.roomType,
                    Price_of_booking: data.roomPrice,
                    //totalPrice: data.totalPrice
                });
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
            } finally {
                setLoading(false);
            }
        };

        fetchBookingDetails();
    }, []);

    if (loading) return <Spin size="large" />;
    if (error) return <Text type="danger">{error}</Text>;
    if (!bookingDetails) return <Text>Данные бронирования не найдены</Text>;

    return (
        <Layout style={layoutStyle}>
            <Layout.Content style={contentStyle}>
                <Title level={2} style={{ textAlign: 'left' }}>Ваше бронирование</Title>

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