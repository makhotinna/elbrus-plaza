import { Edit, SimpleForm, TextInput, DateInput, NumberInput, SelectInput, useNotify, useRedirect } from 'react-admin';

const statusChoices = [
  { id: 'pending', name: 'Ожидание' },
  { id: 'confirmed', name: 'Подтверждено' },
  { id: 'cancelled', name: 'Отменено' },
  { id: 'completed', name: 'Завершено' },
];

const paymentChoices = [
  { id: 'unpaid', name: 'Не оплачено' },
  { id: 'paid', name: 'Оплачено' },
  { id: 'partially_paid', name: 'Частично оплачено' },
  { id: 'refunded', name: 'Возврат' },
];

export const BookingsEdit = () => {
  const notify = useNotify();
  const redirect = useRedirect();

  const onError = (error: Error) => {
    notify(`Ошибка: ${error.message}`, { type: 'error' });
    redirect('list');
  };

  return (
    <Edit mutationOptions={{ onError }}>
      <SimpleForm>
        <TextInput source="ID_booking" label="ID бронирования" disabled />
        <TextInput source="ID_client" label="ID клиента" />
        <TextInput source="ID_Hotel" label="ID отеля" />
        <TextInput source="ID_room" label="ID номера" />
        <DateInput source="In_date_booking" label="Дата заезда" />
        <DateInput source="Out_day_booking" label="Дата выезда" />
        <NumberInput source="Price_of_booking" label="Стоимость" />
        <SelectInput source="Status_booking" label="Статус брони" choices={statusChoices} />
        <SelectInput source="Status_payment" label="Статус оплаты" choices={paymentChoices} />
      </SimpleForm>
    </Edit>
  );
};