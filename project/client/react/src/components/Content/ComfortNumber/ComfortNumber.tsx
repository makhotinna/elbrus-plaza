import { useState } from 'react';
import { RoomButtons } from './TextAndButton/ButtonNumber.tsx';
import StandartNumber from './Components/Number/TreePlaceComfortNumber.tsx';
import ImprovedNumber from './Components/Number/FourPlaceComfortNumber.tsx';

interface TwoPlaceProps {
  buttonsPosition?: {
    x: number;
    y: number;
  };
}

type RoomType = 'standard' | 'improved' | 'deluxe';

const ComfortNumber: React.FC<TwoPlaceProps> = ({ buttonsPosition = { x: 10, y: 20 } }) => {
  const [selectedRoom, setSelectedRoom] = useState<RoomType>('standard');

  const headerStyle: React.CSSProperties = {
    fontSize: '50px',
    fontWeight: '600',
    color: '#512E2E',
    margin: '0px 0',
    textAlign: 'left',
    marginLeft: '20px',
    marginTop: '20px',
  };

  return (
    <div>
      <h1 style={headerStyle}>Номера комфорт</h1>
      <RoomButtons
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
        buttonsPosition={buttonsPosition}
      />
      {selectedRoom === 'standard' && <StandartNumber />}
      {selectedRoom === 'improved' && <ImprovedNumber />}
    </div>
  );
};

export default ComfortNumber;