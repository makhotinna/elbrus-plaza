import { Layout } from 'antd';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import MainPage from './pagers/MainPage';
import LoyaltyPage from './pagers/LoyaltyProgramPage.tsx';
import ContactsPage from './pagers/PersonalAccountPage.tsx';
import ServicesPage from './pagers/ServicePage.tsx';
import React from 'react';
import ReservePage from './pagers/ReservePage.tsx';
import ViewingNumbers from './pagers/ViewingNumbersPage.tsx'
import BookingPage from './pagers/BookingPage.tsx';
import BookingFormPage from './pagers/BookingFormPage.tsx';
import ChangeDataPage from './pagers/ChangeData.tsx';


const App: React.FC = () => {
  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      margin: 0,
      padding: 0,
      overflowX: 'hidden'
    }}>
      <Router>
        <Layout style={{
          width: '100%',
          margin: 0,
          padding: 0,
          background: 'transparent'
        }}>
          <Routes>
            <Route path='/numbers' element={<ViewingNumbers />} /> {/* Просмотр номеров */}
            <Route path='/' element={<MainPage />} /> {/* Главная страница */}
            <Route path='/main' element={<MainPage />} /> {/* Главная страница */}
            <Route path='/loyalty' element={<LoyaltyPage />} /> {/* Программа лояльности */}
            <Route path='/account' element={<ContactsPage />} /> {/* Личный кабинет */}
            <Route path='/service' element={<ServicesPage />} /> {/* Услуги */}
            <Route path='/reserve' element={<ReservePage />} /> {/* Забронировать*/}
            <Route path='/booking' element={<BookingPage />} /> {/* После заполнения страницы резерв */}
            <Route path='/bookingform' element={<BookingFormPage />} /> {/* Форма заполнения конечная */}
            <Route path='/change' element={<ChangeDataPage />} /> 
          </Routes>
        </Layout>
      </Router>
    </div>
  );
};

export default App;