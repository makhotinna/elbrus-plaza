import { Button } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledButton = styled(Button)`
  position: absolute;
  top: 9%;
  left: 37%;
  color: white !important;
  background-color: transparent;
  border: none;
  font-size: 25px;
  &:hover {
    color: #A0A0A0 !important;
    background-color: transparent;
  }
`;

const ButtonViewingNumber: React.FC = () => {
  return (
    <Link to="/numbers"> {/* Укажите здесь нужный путь */}
      <StyledButton type="link" size="large">
        Просмотр номеров
      </StyledButton>
    </Link>
  );
};

export default ButtonViewingNumber;