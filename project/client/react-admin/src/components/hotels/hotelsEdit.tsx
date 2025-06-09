import { Edit, SimpleForm, TextInput, NumberInput } from 'react-admin';

export const HotelEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="ID_Hotel" label="ID" />
            <TextInput source="Name_hotel" label="Название" fullWidth />
            <TextInput source="Adress_hotel" label="Адрес" fullWidth />
            <TextInput source="Phone_hotel" label="Телефон" fullWidth />
            <NumberInput source="Rating_hotel" label="Рейтинг" min={0} max={5} step={0.1} />
            <TextInput source="Description_hotel" label="Описание" multiline fullWidth />
            <TextInput source="Email_hotel" label="Email" type="email" fullWidth />
        </SimpleForm>
    </Edit>
);