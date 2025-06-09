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
  bottom: 33px;
  right: 50px
`;

interface LoginButtonProps {
  onClick?: (e: React.MouseEvent) => void;
}

const LoginButtonH: React.FC<LoginButtonProps> = ({ onClick }) => {
  return (
    <StyledButton 
      type="primary"
      htmlType="submit"
      onClick={onClick}
    >
      Войти в аккаунт
    </StyledButton>
  );
};

export default LoginButtonH;