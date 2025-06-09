import { Show, SimpleShowLayout, TextField, NumberField, BooleanField, SelectField } from 'react-admin';

import { roomTypes, viewTypes } from './RoomsEdit';

export const RoomsShow = () => (
    <Show>
        <SimpleShowLayout>
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
        </SimpleShowLayout>
    </Show>
);