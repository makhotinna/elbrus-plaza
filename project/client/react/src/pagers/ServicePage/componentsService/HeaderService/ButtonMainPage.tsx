import { Link } from 'react-router-dom';
import { Button } from 'antd';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  position: absolute;
  top: 9%;
  left: 14%;
  color: white !important;
  background-color: transparent;
  border: none;
  font-size: 25px;
  &:hover {
    color: #A0A0A0 !important;
    background-color: transparent;
  }
`;

const ButtonMainPageS: React.FC = () => {
  return (
    <Link to="/">
      <StyledButton type="link" size="large">
        Главная страница
      </StyledButton>
    </Link>
  );
};

export default ButtonMainPageS;