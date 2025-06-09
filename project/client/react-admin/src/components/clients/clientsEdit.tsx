import { Edit, SimpleForm, TextInput, NumberInput, PasswordInput, useRedirect } from 'react-admin';

export const ClientsEdit = () => {
    const redirect = useRedirect();
    
    const onSuccess = (data: any) => {
        // Перенаправляем на список отелей вместо просмотра созданного
        redirect('list', 'client');
    };  

    return (
    <Edit mutationOptions={{ onSuccess }}>
        <SimpleForm>
            <TextInput source="ID_client" disabled label="ID клиента" />
            <NumberInput source="ID_Hotel" label="ID отеля" />
            <TextInput source="Name_client" label="ФИО" fullWidth />
            <TextInput source="Email_client" type="email" label="Email" />
            <TextInput source="Phone_client" label="Телефон" />
            <PasswordInput source="Password_client" label="Пароль" />
            <NumberInput source="Points_balance" label="Бонусные баллы" />
        </SimpleForm>
    </Edit>
    );
}