import { useState } from 'react';
import { RoomButtons } from './TextAndButton/ButtonNumber.tsx';
import StandartNumber from './Components/Number/FamilyNumber.tsx';

interface LuxProps {
  buttonsPosition?: {
    x: number;
    y: number;
  };
}

type RoomType = 'standard' | 'improved' | 'deluxe';

const BigHouse: React.FC<LuxProps> = ({ buttonsPosition = { x: 10, y: 20 } }) => {
  const [selectedRoom, setSelectedRoom] = useState<RoomType>('standard');

  const headerStyle: React.CSSProperties = {
    fontSize: '50px',
    fontWeight: '600',
    color: '#512E2E',
    margin: '0px 0',
    textAlign: 'left',
    marginLeft: '20px',
    marginTop: '100px',

  };

  return (
    <div>
      <h1 style={headerStyle}>Большой дом</h1>
      <RoomButtons
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
        buttonsPosition={buttonsPosition}
      />
      {selectedRoom === 'standard' && <StandartNumber />}
    </div>
  );
};

export default BigHouse;