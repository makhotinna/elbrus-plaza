import React, { useState } from 'react';
import { ConfigProvider, Button } from 'antd';
import type { ThemeConfig } from 'antd';
import { useBooking } from '../../../contexts/BookingContext';

const buttonStyle: React.CSSProperties = {
  position: 'absolute',
  top: '307px',
  right: '90px',
  height: '90px',
  width: '120px',
  display: 'flex',
  flexDirection: 'column',
  padding: '10px',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  border: 'none',
};

const textStyle: React.CSSProperties = {
  margin: 0,
  padding: 0,
  lineHeight: '1',
};

const SaveButton: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const { saveBookingDraft } = useBooking();

  const theme: ThemeConfig = {
    components: {
      Button: {
        colorText: hovered ? '#A0A0A0' : '#C0C0C0',
        contentFontSize: 14,
        borderRadius: 0,
        controlHeight: 10,
      },
    },
  };

  return (
    <ConfigProvider theme={theme}>
      <Button 
        type="text"
        style={buttonStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={saveBookingDraft}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={textStyle}>Сохранить<br />изменения</span>
        </div>
      </Button>
    </ConfigProvider>
  );
};

export default SaveButton;