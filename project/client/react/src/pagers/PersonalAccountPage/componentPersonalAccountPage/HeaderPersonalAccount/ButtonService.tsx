import { Link } from 'react-router-dom';
import { Button } from 'antd';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  position: absolute;
  top: 35%;
  left: 55%;
  color: black !important;
  background-color: transparent;
  border: none;
  font-size: 25px;
  &:hover {
    color: #A0A0A0 !important;
    background-color: transparent;
  }
`;

const ButtonServicePersonalAccount: React.FC = () => {
  return (
    <Link to="/service">
      <StyledButton type="link" size="large">
        Услуги
      </StyledButton>
    </Link>
  );
};

export default ButtonServicePersonalAccount;