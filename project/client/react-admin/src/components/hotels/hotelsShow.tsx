import { Show, SimpleShowLayout, TextField, NumberField } from 'react-admin';

export const HotelShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="ID_Hotel" label="ID" />
            <TextField source="Name_hotel" label="Название" />
            <TextField source="Adress_hotel" label="Адрес" />
            <TextField source="Phone_hotel" label="Телефон" />
            <NumberField source="Rating_hotel" label="Рейтинг" />
            <TextField source="Description_hotel" label="Описание" />
            <TextField source="Email_hotel" label="Email" />
        </SimpleShowLayout>
    </Show>
);