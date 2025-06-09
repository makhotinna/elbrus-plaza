import React from 'react';
import { Button } from 'antd';

const buttonStyle: React.CSSProperties = {
    fontSize: '18px',
    position: 'absolute',
    left: '70px',
    top: '210px',
    color: '#717171',
    transition: 'color 0.3s ease' 
};

interface HouseButtonProps{
    onClick?: () => void;
}

const DvamestaButton: React.FC<HouseButtonProps> = ({ onClick }) => {
    // Обработчики событий с типизацией
    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.style.color = '#162E52';
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.style.color = '#717171';
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.style.color = '#000000'; 
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
            Большой дом 
        </Button>
    );
};

export default DvamestaButton;