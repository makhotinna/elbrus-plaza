import { Show, SimpleShowLayout, TextField, EmailField, NumberField } from 'react-admin';

export const ClientsShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="ID_client" label="ID клиента" />
            <TextField source="ID_Hotel" label="ID отеля" />
            <TextField source="Name_client" label="ФИО" />
            <EmailField source="Email_client" label="Email" />
            <TextField source="Phone_client" label="Телефон" />
            <NumberField source="Points_balance" label="Бонусные баллы" />
        </SimpleShowLayout>
    </Show>
);