import { Create, SimpleForm, NumberInput, BooleanInput, SelectInput } from 'react-admin';
import { required, minValue } from 'react-admin';

import { roomTypes, viewTypes } from './RoomsEdit';

export const RoomsCreate = () => (
    <Create>
        <SimpleForm>
            <NumberInput 
                source="ID_Hotel" 
                label="ID отеля" 
                validate={[required(), minValue(1)]}
                min={1}
                fullWidth
            />

            <NumberInput 
                source="Number_room" 
                label="Номер комнаты" 
                validate={[required(), minValue(1)]}
                min={1}
                fullWidth
            />

            <SelectInput 
                source="Type_room" 
                label="Тип номера"
                choices={roomTypes}
                validate={required()}
                fullWidth
            />

            <NumberInput 
                source="Number_of_beds" 
                label="Количество кроватей"
                validate={[required(), minValue(1)]}
                min={1}
                fullWidth
            />

            <BooleanInput 
                source="Room_Availability" 
                label="Доступность"
                defaultValue={true}
                fullWidth
            />

            <NumberInput 
                source="Room_rate_per_night" 
                label="Цена за ночь (руб)"
                validate={[required(), minValue(0)]}
                min={0}
                step={0.01}
                fullWidth
            />

            <SelectInput 
                source="View_from_the_windows" 
                label="Вид из окна"
                choices={viewTypes}
                fullWidth
            />

            <BooleanInput 
                source="Accessibility_for_people_with_disabilities" 
                label="Доступ для людей с ограниченными возможностями"
                defaultValue={false}
                fullWidth
            />

            <BooleanInput 
                source="Extra_sleeping_place" 
                label="Дополнительное спальное место"
                defaultValue={false}
                fullWidth
            />
        </SimpleForm>
    </Create>
);