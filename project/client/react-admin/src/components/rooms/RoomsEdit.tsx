import { 
    Edit, 
    SimpleForm, 
    NumberInput, 
    BooleanInput, 
    SelectInput,
    required,
    minValue,
    useNotify,
    useRedirect,
    EditProps
} from 'react-admin';

interface RoomEditType {
    id: number;
    ID_Room: number;
    ID_Hotel: number;
    Number_room: number;
    Type_room: string;
    Number_of_beds: number;
    Room_Availability: boolean;
    Room_rate_per_night: number;
    View_from_the_windows?: string;
    Accessibility_for_people_with_disabilities: boolean;
    Extra_sleeping_place: boolean;
}

export const roomTypes = [
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

export const viewTypes = [
    { id: 'горы', name: 'горы' },
    { id: 'город', name: 'город' },
    { id: 'сад', name: 'сад' },
    { id: 'панорамный вид на горы', name: 'панорамный вид на горы' },
];

export const RoomsEdit: React.FC<EditProps<RoomEditType>> = (props) => {
    const notify = useNotify();
    const redirect = useRedirect();

    const onError = (error: Error) => {
        notify(`Ошибка при редактировании номера: ${error.message}`, { type: 'error' });
        redirect('list');
    };

    return (
        <Edit<RoomEditType> 
            {...props} 
            mutationOptions={{ onError }}
            title="Редактирование номера"
        >
            <SimpleForm warnWhenUnsavedChanges>
                <NumberInput 
                    source="ID_Room" 
                    label="ID номера" 
                    disabled
                    fullWidth
                />

                <NumberInput 
                    source="ID_Hotel" 
                    label="ID отеля" 
                    validate={[required('Обязательное поле'), minValue(1, 'Минимум 1')]}
                    min={1}
                    step={1}
                    fullWidth
                />

                <NumberInput 
                    source="Number_room" 
                    label="Номер комнаты" 
                    validate={[required('Обязательное поле'), minValue(1, 'Минимум 1')]}
                    min={1}
                    step={1}
                    fullWidth
                />

                <SelectInput 
                    source="Type_room" 
                    label="Тип номера"
                    choices={roomTypes}
                    validate={required('Обязательное поле')}
                    fullWidth
                />

                <NumberInput 
                    source="Number_of_beds" 
                    label="Количество кроватей"
                    validate={[required('Обязательное поле'), minValue(1, 'Минимум 1')]}
                    min={1}
                    step={1}
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
                    validate={[required('Обязательное поле'), minValue(0, 'Не может быть отрицательным')]}
                    min={0}
                    step={100}
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
        </Edit>
    );
};