import { Create, SimpleForm, TextInput, NumberInput, PasswordInput } from 'react-admin';

export const ClientsCreate = () => (
    <Create>
        <SimpleForm>
            <NumberInput source="ID_Hotel" label="ID отеля" />
            <TextInput source="Name_client" label="ФИО" fullWidth />
            <TextInput source="Email_client" type="email" label="Email" />
            <TextInput source="Phone_client" label="Телефон" />
            <PasswordInput source="Password_client" label="Пароль" />
            <NumberInput source="Points_balance" label="Бонусные баллы" defaultValue={0} />
        </SimpleForm>
    </Create>
);