import { Layout, Flex } from 'antd'; 
import Image from '../picture/Frame 69.png'; 
import ButtonMainPage from './Header/Button/ButtonMP.tsx'; 
import ButtonLoyaltyProgram from './Header/Button/ButtonLP.tsx'; 
import ButtonService from './Header/Button/ButtonService.tsx'; 
import ButtonContacts from './Header/Button/ButtonPersonalAccount.tsx'; 
import TextHeader from './Header/Text.tsx'; 
import AppLayouts from './Header/Calendar/calendar'; 
import ButtonSearch from './Header/Button/ButtonSearch.tsx'; 

const headerStyle: React.CSSProperties = { 
    height: 373,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffff11',
};

const imageContainerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block'
}; 

const calendarOverlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: '120%',
    left: '70%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '400px',
    backgroundColor: 'transparent',
};


const AppHeader: React.FC = () => {
    return (
        <Layout.Header style={headerStyle}>
            <div style={imageContainerStyle}>
                <img 
                    src={Image} 
                    alt="Логотип компании" 
                    style={{ height: '400px' }} 
                />
                
                <TextHeader />
                <Flex gap="small">
                    <ButtonMainPage />
                    <ButtonLoyaltyProgram />
                    <ButtonService />
                    <ButtonContacts />
                </Flex>
                <div style={calendarOverlayStyle}>
                    <AppLayouts />
                </div>
                
                <ButtonSearch />
            </div>
        </Layout.Header>
    );
};

export default AppHeader;