import { Button } from 'antd';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  font-family: New Century Schoolbook, TeX Gyre Schola, serif !important;
  font-size: 20px !important;
  height: 40px !important;
  width: 200px !important;
  border-radius: 20px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  margin: 0 120px 0 10px !important;
`;

interface RegisterButtonProps {
  onClick?: () => void;
}

const RegisterButton: React.FC<RegisterButtonProps> = ({ onClick }) => {
  return (
    <StyledButton 
      icon={<i className="fa fa-user-plus" aria-hidden="true" />}
      type="text"
      onClick={onClick}
    >
      Зарегистрироваться
    </StyledButton>
  );
};

export default RegisterButton;