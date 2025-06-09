import React, { useState } from 'react';
import { Layout } from 'antd';
import AppHeader from '../components/AppHeader';
import ContinuationHeader from '../components/ContinuationHeader';
import AppSider from '../components/AppSider';
import AppContent from '../components/AppContent';

// Типы вынесены в начало файла для лучшей читаемости
interface BookingDates {
  In_date_booking: Date | null;
  Out_date_booking: Date | null;
}

// Основной компонент страницы просмотра номеров
const ViewingNumbers: React.FC = () => {
  // Состояние для хранения дат бронирования
  const [bookingDates, setBookingDates] = useState<BookingDates>({
    In_date_booking: null,
    Out_date_booking: null
  });

  // Обработчик сохранения дат
  const handleDatesSave = (newDates: BookingDates) => {
    setBookingDates(newDates);
    // Здесь можно добавить дополнительную логику, например:
    // - сохранение в localStorage
    // - отправку на сервер
    // - обновление других компонентов
  };

  return (
    <div style={styles.container}>
      <Layout style={styles.layout}>
        {/* Шапка с календарем выбора дат */}
        <AppHeader 
          onDatesSave={handleDatesSave}
          dates={bookingDates}
        />
        
        {/* Дополнительная шапка (возможно, фильтры или информация) */}
        <Layout style={styles.subHeaderLayout}>
          <ContinuationHeader dates={bookingDates} />
        </Layout>
        
        {/* Основное содержимое страницы */}
        <Layout style={styles.contentLayout}>
          {/* Боковая панель (фильтры или меню) */}
          <AppSider />
          
          {/* Основной контент (список номеров) */}
          <AppContent dates={bookingDates} />
        </Layout>
      </Layout>
    </div>
  );
};

// Стили вынесены в отдельный объект для лучшей организации кода
const styles = {
  container: {
    width: '100vw',
    minHeight: '100vh',
    margin: 0,
    padding: 0,
    overflowX: 'hidden'
  } as React.CSSProperties,
  
  layout: {
    width: '100%',
    margin: 0,
    padding: 0,
    background: 'transparent'
  } as React.CSSProperties,
  
  subHeaderLayout: {
    margin: 0,
    padding: 0
  } as React.CSSProperties,
  
  contentLayout: {
    margin: 0,
    padding: 0,
    display: 'flex',
    minHeight: 'calc(100vh - 373px)' // Высота шапки 373px
  } as React.CSSProperties
};

export default ViewingNumbers;