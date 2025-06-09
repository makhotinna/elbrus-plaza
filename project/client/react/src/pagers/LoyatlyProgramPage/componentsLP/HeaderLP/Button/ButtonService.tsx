import { Button } from 'antd';
import type { ButtonProps } from 'antd'; 
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledButton = styled(Button)<ButtonProps>`
  position: absolute;
  top: 9%;
  left: 60%;
  color: white !important;
  background-color: transparent;
  border: none;
  font-size: 25px;
  
  &:hover {
    color: #a0a0a0 !important;
    background-color: transparent;
  }
`;

const ButtonServiceLP: React.FC = () => {
  return (
    <Link to="/service">
    <StyledButton 
      type="link" 
      size="large"
    >
      Услуги
    </StyledButton>
    </Link>
  );
};

export default ButtonServiceLP;