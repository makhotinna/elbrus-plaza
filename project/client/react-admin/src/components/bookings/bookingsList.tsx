import { List, Datagrid, TextField, DateField, NumberField, SelectField } from 'react-admin';

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

export const BookingsList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="ID_booking" label="ID бронирования" />
      <TextField source="ID_client" label="ID клиента" />
      <TextField source="ID_Hotel" label="ID отеля" />
      <TextField source="ID_room" label="ID номера" />
      <DateField source="In_date_booking" label="Дата заезда" locales="ru-RU" />
      <DateField source="Out_day_booking" label="Дата выезда" locales="ru-RU" />
      <NumberField source="Price_of_booking" label="Стоимость" options={{ style: 'currency', currency: 'RUB' }} />
      <SelectField source="Status_booking" label="Статус брони" choices={statusChoices} />
      <SelectField source="Status_payment" label="Статус оплаты" choices={paymentChoices} />
    </Datagrid>
  </List>
);