import { Button } from 'antd';
import type { ButtonProps } from 'antd'; 
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledButton = styled(Button)<ButtonProps>`
  position: absolute;
  top: 9%;
  left: 73%;
  color: white !important;
  background-color: transparent;
  border: none;
  font-size: 25px;
  &:hover {
    color: #a0a0a0 !important;
    background-color: transparent;
  }
`;

const ButtonContactsLP: React.FC = () => {
  return (
    <Link to="/account">
      <StyledButton type="link" size="large">
        Личный кабинет
      </StyledButton>
    </Link>
  );
};
export default ButtonContactsLP;