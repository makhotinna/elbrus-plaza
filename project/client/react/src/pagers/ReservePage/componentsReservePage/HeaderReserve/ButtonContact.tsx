import { Button } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledButton = styled(Button)`
  position: absolute;
  top: 6%;
  left: 72%;
  color: black !important;
  background-color: transparent;
  border: none;
  font-size: 25px;
  &:hover {
    color: #A0A0A0 !important;
    background-color: transparent;
  }
`;

const ButtonContactsReserveP: React.FC = () => {
  return (
    <Link to="/account">
      <StyledButton type="link" size="large">
        Личный кабинет
      </StyledButton>
    </Link>
  );
};
export default ButtonContactsReserveP;