import { List, Datagrid, TextField, NumberField, EditButton, ShowButton } from 'react-admin';
import { Hotel } from '../../interfaces';

export const HotelList = () => (
    <List>
        <Datagrid rowClick="show">
            <TextField source="ID_Hotel" label="ID" />
            <TextField source="Name_hotel" label="Название" />
            <TextField source="Adress_hotel" label="Адрес" />
            <TextField source="Phone_hotel" label="Телефон" />
            <NumberField source="Rating_hotel" label="Рейтинг" />
            <TextField source="Email_hotel" label="Email" />
            <ShowButton />
            <EditButton />
        </Datagrid>
    </List>
);