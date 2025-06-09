import { Create, SimpleForm, TextInput, NumberInput, required, useRedirect } from 'react-admin';

export const HotelCreate = () => {
    const redirect = useRedirect();
    
    const onSuccess = (data: any) => {
        // Перенаправляем на список отелей вместо просмотра созданного
        redirect('list', 'hotel');
    };

    return (
        <Create mutationOptions={{ onSuccess }}>
            <SimpleForm>
                <TextInput source="Name_hotel" label="Название" validate={[required()]} fullWidth />
                <TextInput source="Adress_hotel" label="Адрес" validate={[required()]} fullWidth />
                <TextInput source="Phone_hotel" label="Телефон" validate={[required()]} fullWidth />
                <NumberInput source="Rating_hotel" label="Рейтинг" min={0} max={5} step={0.1} />
                <TextInput source="Description_hotel" label="Описание" multiline fullWidth />
                <TextInput source="Email_hotel" label="Email" type="email" fullWidth />
            </SimpleForm>
        </Create>
    );
};