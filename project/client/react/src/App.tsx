import { Layout } from 'antd';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BookingProvider } from './contexts/BookingContext.tsx';

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
    <BookingProvider> 
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
              <Route path='/numbers' element={<ViewingNumbers />} />
              <Route path='/' element={<MainPage />} />
              <Route path='/main' element={<MainPage />} />
              <Route path='/loyalty' element={<LoyaltyPage />} />
              <Route path='/account' element={<ContactsPage />} />
              <Route path='/service' element={<ServicesPage />} />
              <Route path='/reserve' element={<ReservePage />} />
              <Route path='/booking' element={<BookingPage />} />
              <Route path='/bookingform' element={<BookingFormPage />} />
              <Route path='/change' element={<ChangeDataPage />} />
            </Routes>
          </Layout>
        </Router>
      </div>
    </BookingProvider>
  );
};

export default App;