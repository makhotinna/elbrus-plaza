import React, { useState } from "react";
import { Link } from 'react-router-dom';
import AppLayouts from './Calendar/calendar';
import ButtonSearch from "./ButtonSearch";

interface BookingFormData {
  checkAddService: string;
}

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    checkAddService: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Обработка данных формы
    console.log('Форма отправлена:', formData);
  };

  const calendarOverlayStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '340px',
    left: '238px',
    transform: 'translate(-50%, -50%)',
    maxWidth: '400px',
    backgroundColor: 'transparent',
    height: '1px'
};



  return (
    <section className='main-page'>
      <div className='first-block'>
        <h1>Создаем мир, в <br /> который хочется <br /> вернуться</h1>
      </div>

      
      <div className='booking-form'>
        <form onSubmit={handleSubmit}>
          <div className='form-container'>
            <Link to='/reserve'> </Link>
            <Link to='/numbers'>
              <ButtonSearch/>
            </Link>
          </div>

          <div>
          </div>

          <div className='input-info'>
            <div style={calendarOverlayStyle}>
              <AppLayouts />
            </div>
            <div className='service'>
              <select
                className='add-service'
                name='checkAddService'
                value={formData.checkAddService}
                onChange={handleInputChange}
                required
              >
                <option value='' selected hidden>Выберите услугу</option>
                <option value='Забронировать номер'>Активный отдых и приключения</option>
                <option value='SPA'>Экскурсии по Кабардино-Балкарии</option>
                <option value='Проведение мероприятий'>Релакс и восстановление</option>
                <option value='Трансфер'>Для особых случаев</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BookingForm;