import React from 'react';
import { Button } from 'antd';

const buttonStyle: React.CSSProperties = {
    fontSize: '18px',
    position: 'absolute',
    left: '70px',
    top: '130px',
    color: '#717171',
    transition: 'color 0.3s ease' 
};

interface ComfortButtonProps {
    onClick?: () => void;
}

const ComfortButton: React.FC<ComfortButtonProps> = ({ onClick }) => {
    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
        e.currentTarget.style.color = '#162E52';
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
        e.currentTarget.style.color = '#717171';
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
        e.currentTarget.style.color = '#000';
    };

    return (
        <Button
            type="link"
            style={buttonStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onClick={onClick}
        >
            Номера комфорт
        </Button>
    );
};

export default ComfortButton;