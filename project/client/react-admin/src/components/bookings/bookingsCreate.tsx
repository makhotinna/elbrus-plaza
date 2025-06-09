import { Create, SimpleForm, TextInput, DateInput, NumberInput, SelectInput } from 'react-admin';

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

export const BookingsCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="ID_client" label="ID клиента" />
      <TextInput source="ID_Hotel" label="ID отеля" />
      <TextInput source="ID_room" label="ID номера" />
      <DateInput source="In_date_booking" label="Дата заезда" />
      <DateInput source="Out_day_booking" label="Дата выезда" />
      <NumberInput source="Price_of_booking" label="Стоимость" />
      <SelectInput 
        source="Status_booking" 
        label="Статус брони" 
        choices={statusChoices} 
        defaultValue="pending"
      />
      <SelectInput 
        source="Status_payment" 
        label="Статус оплаты" 
        choices={paymentChoices} 
        defaultValue="unpaid"
      />
    </SimpleForm>
  </Create>
);