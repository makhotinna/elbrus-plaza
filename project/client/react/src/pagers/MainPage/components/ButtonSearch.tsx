import { ConfigProvider, Button } from 'antd';
import type { ThemeConfig } from 'antd'; 
import { SearchOutlined } from '@ant-design/icons';
import React, { CSSProperties, useState } from 'react';

const buttonStyle: CSSProperties = {
  position: 'absolute',
  top: '500px',
  right: '690px',
  height: '120px',
  width: '120px',
  display: 'flex',
  flexDirection: 'column',
  padding: '10px',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  border: 'none',
};

const textStyle: CSSProperties = {
  margin: 0,
  padding: 0,
  lineHeight: '1',
};

interface ButtonSearchProps {
  iconSize?: number;
}

const ButtonSearch: React.FC<ButtonSearchProps> = ({ iconSize = 28 }) => {
  const [hovered, setHovered] = useState(false);

  const theme: ThemeConfig = {
    components: {
      Button: {
        colorText: hovered ? '#A0A0A0' : '#C0C0C0',
        contentFontSize: 14,
        borderRadius: 0,
        controlHeight: 40,
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
      >
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center' 
        }}>
          <SearchOutlined style={{ 
            color: hovered ? '#A0A0A0' : '#ffffff',
            fontSize: iconSize,
            margin: 0,
          }} />
          <span style={textStyle}>
            Забронировать
          </span>
        </div>
      </Button>
    </ConfigProvider>
  );
};

export default ButtonSearch;