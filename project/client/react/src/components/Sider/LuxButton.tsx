import React from 'react';
import { Button } from 'antd';

const buttonStyle: React.CSSProperties = {
  fontSize: '18px',
  position: 'absolute',
  left: '70px',
  top: '90px',
  color: '#717171',
};

interface LuxButtonProps {
  onClick?: () => void;
}

const LuxButton: React.FC<LuxButtonProps> = ({ onClick }) => {
  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.color = '#162E52';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.color = '#717171';
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.color = '#000000';
  };

  const handleClick = () => {
    const element = document.getElementById('lux');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    onClick?.();
  };

  return (
    <Button
      type="link"
      style={buttonStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      Номера люкс
    </Button>
  );
};

export default LuxButton;