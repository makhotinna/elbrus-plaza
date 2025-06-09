import { Flex } from 'antd';

const ContactsPageStyle: React.CSSProperties = {
  height: '100vh',
  backgroundColor: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '48px',
  fontWeight: 'bold',
};

const BookingPage: React.FC = () => {
  return (
    <Flex style={ContactsPageStyle}>
      Найденные номера при бронировании 
    </Flex>
  );
};

export default BookingPage;