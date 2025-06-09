import { Button } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
    
const StyledButton = styled(Button)`
  font-family: New Century Schoolbook, TeX Gyre Schola, serif !important;
  font-size: 20px !important;
  height: 40px !important;
  width: 200px !important;
  border-radius: 20px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  margin: 0 100px 0 45px !important;
  background-color:rgb(255, 255, 255) !important; // Временный цвет для проверки
  z-index: 1000 !important; // Поднять над другими элементами
`;

interface ReserveButtonProps {
  onClick?: () => void;
}

const ReserveButton: React.FC<ReserveButtonProps> = ({ onClick }) => {
  return (
    <Link to="/reserve">
      <StyledButton
        icon={<i className="fa fa-phone" aria-hidden="true" />}
        type="text"
        onClick={onClick}
      >
        Забронировать
      </StyledButton>
    </Link>
  );
};

export default ReserveButton;