import { Link } from 'react-router-dom';
import { Button } from 'antd';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  position: absolute;
  top: 9%;
  left: 54%;
  color: white !important;
  background-color: transparent;
  border: none;
  font-size: 25px;
  &:hover {
    color: #A0A0A0 !important;
    background-color: transparent;
  }
`;

const ButtonViewingNumberS: React.FC = () => {
  return (
    <Link to="/numbers">
      <StyledButton type="link" size="large">
        Просмотр номеров
      </StyledButton>
    </Link>
  );
};

export default ButtonViewingNumberS;