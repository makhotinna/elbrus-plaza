import { useState } from "react";
import { 
  Form, 
  Input, 
  Button, 
  DatePicker, 
  Radio, 
  Card, 
  Typography,
  message 
} from "antd";
import type { RadioChangeEvent } from "antd";
import Container from "./Container";

const { Title, Text } = Typography;

type PersonalData = {
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: string;
  phone: string;
  email: string;
  gender: string;
};

type PasswordData = {
  newPassword: string;
  confirmPassword: string;
};

export default function CustomForm() {
  const [personalForm] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const [personalData, setPersonalData] = useState<PersonalData>({
    lastName: "",
    firstName: "",
    middleName: "",
    birthDate: "",
    phone: "",
    email: "",
    gender: "",
  });

  const [, setPasswordData] = useState<PasswordData>({
    newPassword: "",
    confirmPassword: "",
  });

  const onPersonalFinish = (values: PersonalData) => {
    console.log("Personal data submitted:", values);
    setPersonalData(values);
    message.success("Персональные данные сохранены");
  };

  const onPasswordFinish = (values: PasswordData) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error("Пароли не совпадают");
      return;
    }
    console.log("Password change requested:", values);
    setPasswordData(values);
    message.success("Запрос на смену пароля отправлен");
  };

  const onGenderChange = (e: RadioChangeEvent) => {
    personalForm.setFieldsValue({ gender: e.target.value });
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", paddingTop: 24 }}>
      <Container>
        <Card title={<Title level={2}>Персональные данные</Title>} style={{ marginBottom: 24 }}>
          <Form
            form={personalForm}
            onFinish={onPersonalFinish}
            layout="vertical"
            initialValues={personalData}
          >
            <Form.Item
              label="Фамилия"
              name="lastName"
              rules={[{ required: true, message: 'Пожалуйста, введите фамилию' }]}
            >
              <Input placeholder="Введите фамилию" />
            </Form.Item>

            <Form.Item
              label="Имя"
              name="firstName"
              rules={[{ required: true, message: 'Пожалуйста, введите имя' }]}
            >
              <Input placeholder="Введите имя" />
            </Form.Item>

            <Form.Item
              label="Отчество"
              name="middleName"
            >
              <Input placeholder="Введите отчество (если есть)" />
            </Form.Item>

            <Form.Item
              label="Дата рождения"
              name="birthDate"
              rules={[{ required: true, message: 'Пожалуйста, выберите дату рождения' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Пожалуйста, введите email' },
                { type: 'email', message: 'Введите корректный email' }
              ]}
            >
              <Input placeholder="Введите email" />
            </Form.Item>

            <Form.Item
              label="Телефон"
              name="phone"
              rules={[{ required: true, message: 'Пожалуйста, введите телефон' }]}
            >
              <Input placeholder="Введите номер телефона" />
            </Form.Item>

            <Form.Item
              label="Пол"
              name="gender"
              rules={[{ required: true, message: 'Пожалуйста, выберите пол' }]}
            >
              <Radio.Group onChange={onGenderChange}>
                <Radio value="male">Мужской</Radio>
                <Radio value="female">Женский</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Сохранить изменения
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Card title={<Title level={3}>Смена пароля</Title>}>
          <Form
            form={passwordForm}
            onFinish={onPasswordFinish}
            layout="vertical"
          >
            <Form.Item
              label="Новый пароль"
              name="newPassword"
              rules={[{ required: true, message: 'Пожалуйста, введите новый пароль' }]}
            >
              <Input.Password placeholder="Введите новый пароль" />
            </Form.Item>

            <Form.Item
              label="Повторите новый пароль"
              name="confirmPassword"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: 'Пожалуйста, повторите пароль' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Пароли не совпадают!'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Повторите новый пароль" />
            </Form.Item>

            <Text type="secondary">
              Подтверждение о смене пароля придет на почту
            </Text>

            <Form.Item style={{ marginTop: 16 }}>
              <Button type="primary" htmlType="submit">
                Изменить пароль
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Container>
    </div>
  );
}