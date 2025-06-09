import { List, Datagrid, TextField, EmailField, NumberField } from 'react-admin';

export const ClientsList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="ID_Client" label="ID клиента" />
            <TextField source="Name_client" label="ФИО" />
            <EmailField source="Email_client" label="Email" />
            <TextField source="Phone_client" label="Телефон" />
            <NumberField source="Points_balance" label="Баллы" />
        </Datagrid>
    </List>
);