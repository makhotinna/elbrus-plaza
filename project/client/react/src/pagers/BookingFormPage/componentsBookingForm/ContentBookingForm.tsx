import { Layout, Form, Input, Button, Select, Row, Col, message, Typography, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const { Content } = Layout;
const { Option } = Select;
const { Text } = Typography;

const contentStyle: React.CSSProperties = {
    padding: '24px',
    minHeight: 'calc(100vh - 64px)',
    backgroundColor: '#f0f2f5',
    marginLeft: '150px'
};

const bookButtonStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: '#142840', 
  color: '#fff', 
  borderColor: '#142840',
  height: '40px',
  fontSize: '16px',
};

const bookButtonHoverStyle: React.CSSProperties = {
  backgroundColor: '#E3D9D4', 
  color: '#000', 
  borderColor: '#E3D9D4',
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

const ContentBookingForm: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
    const [bookingError, setBookingError] = useState<string | null>(null);
    
    // Get id_temp_booking from URL
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
                
                if (!response.ok) {
                    throw new Error(`Ошибка HTTP: ${response.status}`);
                }

                const data = await response.json();
                console.log(data)
                
                if (!data.In_date_booking || !data.Out_date_booking) {
                    throw new Error('Неполные данные бронирования');
                }

                const inDate = new Date(data.In_date_booking);
                const outDate = new Date(data.Out_date_booking);
                const nights = Math.ceil((outDate.getTime() - inDate.getTime()) / (1000 * 60 * 60 * 24));

                setBookingDetails({
                    nights,
                    In_date_booking: data.In_date_booking,
                    Out_date_booking: data.Out_date_booking,
                    checkInTime: '14:00', 
                    checkOutTime: '12:00',
                    roomType: data.Room_Type || 'двухместный стандарт',
                    Price_of_booking: data.Price_of_booking || 5000, 
                    totalPrice: (data.Price_of_booking || 5000) * nights,
                    bookingNumber: data.booking_id || data.id_temp_booking 
                });

            } catch (err) {
                console.error('Ошибка при загрузке данных бронирования:', err);
                setBookingError(err instanceof Error ? err.message : 'Неизвестная ошибка');
            }
        };

        fetchBookingDetails();
    }, [id_temp_booking]); 

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            if (!bookingDetails) {
                throw new Error('Данные бронирования не загружены');
            }

            const bookingData = {
                ID_Booking: 0,
                Type_room: bookingDetails.roomType,
                In_date_booking: bookingDetails.In_date_booking,
                Out_date_booking: bookingDetails.Out_date_booking,
                Price_of_booking: bookingDetails.Price_of_booking,
                Name_client: values.guest1.lastName + ' ' + values.guest1.firstName + ' ' + values.guest1.middleName,
                Email_client: values.guest1.email,
                Phone_client: values.guest1.phone,
            };

            const response = await fetch('http://26.118.5.15:8787/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });
            console.log(JSON.stringify(bookingData))

            if (!response.ok) {
                throw new Error('Ошибка при бронировании');
            }

            const result = await response.json();
            message.success('Бронирование успешно создано!');
            console.log('Ответ сервера:', result);

        } catch (error) {
            console.error('Ошибка:', error);
            message.error('Произошла ошибка при бронировании');
        } finally {
            setLoading(false);
        }
    };

    if (bookingError) return <Text type="danger">{bookingError}</Text>;
    if (!bookingDetails) return <Spin size="large" />;

    return (
        <Layout>
            <Content style={contentStyle}>
                <div style={{ maxWidth: '800px', margin: '0 auto', background: '#fff', padding: '24px', borderRadius: '8px' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Введите данные гостей</h2>

                    {/* Booking Summary Section */}
                    

                    <Form form={form} onFinish={onFinish} layout="vertical">
                        {/* Гость 1 */}
                        <h3 style={{ marginBottom: '16px' }}>Клиент</h3>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name={['guest1', 'lastName']}
                                    rules={[{ required: true, message: 'Пожалуйста, введите фамилию' }]}
                                >
                                    <Input placeholder="Введите фамилию" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name={['guest1', 'firstName']}
                                    rules={[{ required: true, message: 'Пожалуйста, введите имя' }]}
                                >
                                    <Input placeholder="Введите имя" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name={['guest1', 'middleName']}
                                >
                                    <Input placeholder="Введите отчество" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name={['guest1', 'email']}
                                    rules={[
                                        { required: true, message: 'Пожалуйста, введите email' },
                                        { type: 'email', message: 'Неверный формат email' }
                                    ]}
                                >
                                    <Input placeholder="Введите email" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item
                            name={['guest1', 'phone']}
                            rules={[{ required: true, message: 'Пожалуйста, введите номер телефона' }]}
                            style={{ maxWidth: '50%' }}
                        >
                            <Input placeholder="Введите номер телефона" />
                        </Form.Item>

                        <h3 style={{ marginTop: '24px', marginBottom: '16px' }}>Способ оплаты</h3>
                        <Row gutter={16} align="middle">
                            <Col span={12}>
                                <Form.Item
                                    name="paymentMethod"
                                    rules={[{ required: true, message: 'Пожалуйста, выберите способ оплаты' }]}
                                    initialValue="card"
                                >
                                    <Select placeholder="Выберите способ оплаты">
                                        <Option value="card">Банковская карта</Option>
                                        <Option value="cash">Наличные</Option>
                                        <Option value="transfer">Банковский перевод</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        size="large"
                                        style={bookButtonStyle}
                                        loading={loading}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = bookButtonHoverStyle.backgroundColor || '';
                                            e.currentTarget.style.color = bookButtonHoverStyle.color || '';
                                            e.currentTarget.style.borderColor = bookButtonHoverStyle.borderColor || '';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = bookButtonStyle.backgroundColor || '';
                                            e.currentTarget.style.color = bookButtonStyle.color || '';
                                            e.currentTarget.style.borderColor = bookButtonStyle.borderColor || '';
                                        }}
                                    >
                                        {loading ? 'Отправка...' : 'Забронировать'}
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Content>
        </Layout>
    );
};

export default ContentBookingForm;