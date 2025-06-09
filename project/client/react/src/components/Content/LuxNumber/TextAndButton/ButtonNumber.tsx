import React from 'react';

interface ButtonStyles {
  container: React.CSSProperties;
  base: React.CSSProperties;
  active: React.CSSProperties;
}

interface ButtonsPosition {
  x: number;
  y: number;
}

type RoomType = 'standard' | 'improved' | 'deluxe';

interface RoomButtonsProps {
  selectedRoom: RoomType;
  setSelectedRoom: (room: RoomType) => void;
  buttonsPosition: ButtonsPosition;
}

export const buttonStyles: ButtonStyles = {
  container: {
    display: 'flex',
    gap: '40px',
    margin: '0 auto 40px',
  },
  base: {
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    padding: '10px 15px',
    fontSize: '18px',
    color: '#818181',
  },
  active: {
    textDecoration: 'underline',
    fontWeight: 'bold',
    color: '#000',
    transform: 'scale(1.05)'
  }
};

export const RoomButtons: React.FC<RoomButtonsProps> = ({ 
  selectedRoom, 
  setSelectedRoom, 
  buttonsPosition 
}) => {
  return (
    <div style={{ 
      ...buttonStyles.container, 
      transform: `translate(${buttonsPosition.x}px, ${buttonsPosition.y}px)` 
    }}>
      <button
        onClick={() => setSelectedRoom('standard')}
        style={{
          ...buttonStyles.base,
          ...(selectedRoom === 'standard' && buttonStyles.active)
        }}
      >
        Люкс
      </button>
      <button
        onClick={() => setSelectedRoom('improved')}
        style={{
          ...buttonStyles.base,
          ...(selectedRoom === 'improved' && buttonStyles.active)
        }}
      >
        Президентский люкс
      </button>
    </div>
  );
};