import { List, Datagrid, TextField, NumberField, BooleanField, SelectField } from 'react-admin';

const roomTypes = [
    { id: 'двухместный стандарт', name: 'двухместный стандарт' },
    { id: 'улучшенный двухместный', name: 'улучшенный двухместный' },
    { id: 'двухместный делюкс', name: 'двухместный делюкс' },
    { id: 'дом с тремя спальнями', name: 'дом с тремя спальнями' },
    { id: 'люкс', name: 'люкс' },
    { id: 'президентский люкс', name: 'президентский люкс' },
    { id: 'семейный номер', name: 'семейный номер' },
    { id: 'трехместный номер Комфорт', name: 'трехместный номер Комфорт' },
    { id: 'четырехместный номер комфорт', name: 'четырехместный номер комфорт' },
];

const viewTypes = [
    { id: 'горы', name: 'горы' },
    { id: 'город', name: 'город' },
    { id: 'сад', name: 'сад' },
    { id: 'панорамный вид на горы', name: 'панорамный вид на горы' },
];

export const RoomsList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="ID_Room" label="ID номера" />
            <NumberField source="ID_Hotel" label="ID отеля" />
            <NumberField source="Number_room" label="Номер комнаты" />
            <SelectField source="Type_room" choices={roomTypes} label="Тип номера" />
            <NumberField source="Number_of_beds" label="Количество кроватей" />
            <BooleanField source="Room_Availability" label="Доступность" />
            <NumberField 
                source="Room_rate_per_night" 
                label="Цена за ночь" 
                options={{ style: 'currency', currency: 'RUB' }}
            />
            <SelectField source="View_from_the_windows" choices={viewTypes} label="Вид из окна" />
            <BooleanField source="Accessibility_for_people_with_disabilities" label="Доступ для инвалидов" />
            <BooleanField source="Extra_sleeping_place" label="Доп. место для сна" />
        </Datagrid>
    </List>
);