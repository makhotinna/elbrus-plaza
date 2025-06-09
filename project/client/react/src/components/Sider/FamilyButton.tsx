import React from 'react';
import { Button } from 'antd';

const buttonStyle: React.CSSProperties = {
    fontSize: '18px',
    position: 'absolute',
    left: '70px',
    top: '170px',
    color: '#717171',
    transition: 'color 0.3s ease' 
};

interface FamilyButtonProps{
    onClick?: () => void;
}

const FamilyButton: React.FC<FamilyButtonProps> = ({ onClick }) => {
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
            Семейный номер
        </Button>
    );
};

export default FamilyButton;