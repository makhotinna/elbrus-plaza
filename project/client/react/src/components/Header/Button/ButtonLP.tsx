import { Link } from 'react-router-dom';
import { Button } from 'antd';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  position: absolute;
  top: 13%;
  left: 36%;
  color: white !important;
  background-color: transparent;
  border: none;
  font-size: 25px;
  &:hover {
    color: #A0A0A0 !important;
    background-color: transparent;
  }
`;

const ButtonLoyaltyProgram: React.FC = () => {
  return (
    <Link to="/loyalty">
      <StyledButton type="link" size="large">
        Программа лояльности
      </StyledButton>
    </Link>
  );
};

export default ButtonLoyaltyProgram;