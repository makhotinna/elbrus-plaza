import { useState } from 'react';
import { RoomButtons } from './TextAndButton/ButtonNumber';
import StandartNumber from './Components/Number/LuxNumber.tsx';
import ImprovedNumber from './Components/Number/PrimeLuxNumber.tsx';

interface LuxProps {
  buttonsPosition?: {
    x: number;
    y: number;
  };
}

// Define type for room selection
type RoomType = 'standard' | 'improved' | 'deluxe';

const Lux: React.FC<LuxProps> = ({ buttonsPosition = { x: 10, y: 20 } }) => {
  const [selectedRoom, setSelectedRoom] = useState<RoomType>('standard');

  // Typed styles
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
      <h1 style={headerStyle}>Номера Люкс</h1>
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

export default Lux;