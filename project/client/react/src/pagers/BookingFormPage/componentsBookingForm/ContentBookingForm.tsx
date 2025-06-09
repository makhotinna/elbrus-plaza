import { Layout, Form, Input, Button, Select, Row, Col, message } from 'antd';
import { useState } from 'react';

const { Content } = Layout;
const { Option } = Select;

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

const ContentBookingForm: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            const bookingData = {
                guest: {
                    name_client: values.guest1.lastName + values.guest1.firstName + values.guest1.middleName,
                    email_client: values.guest1.email,
                    phone_client: values.guest1.phone
                },
                //paymentMethod: values.paymentMethod || 'card' 
            };

            const response = await fetch('http://localhost:8787/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

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

    return (
        <Layout>
            <Content style={contentStyle}>
                <div style={{ maxWidth: '800px', margin: '0 auto', background: '#fff', padding: '24px', borderRadius: '8px' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Введите данные гостей</h2>

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