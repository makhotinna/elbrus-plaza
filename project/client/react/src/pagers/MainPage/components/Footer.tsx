import React from "react";
//import HotelLogo from "C:/Users/lapa_/OneDrive/Рабочий стол/Elbrus-Hotel/my-app/src/pagers/MainPage/image/Hotel-logo.jpg";
import HotelLogo from "../image/Hotel-logo.jpg";



const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <img 
              src= {HotelLogo} 
              alt="Эльбрус-Плаза" 
              className="logo-img"
            />
            <p className="logo-text">Отель "Эльбрус-Плаза"</p>
          </div>
          
          <div className="footer-links">
            <div className="links-column">
              <h4 className="links-title">Навигация</h4>
              <ul className="links-list">
                <li><a href="/">Главная</a></li>
                <li><a href="/rooms">Номера</a></li>
                <li><a href="/services">Услуги</a></li>
                <li><a href="/gallery">Галерея</a></li>
              </ul>
            </div>
            
            <div className="links-column">
              <h4 className="links-title">Контакты</h4>
              <ul className="links-list">
                <li>+7 (988) 721-16-75</li>
                <li>elbrusplaza@hotel.com</li>
              </ul>
            </div>
            
            <div className="links-column">
              <h4 className="links-title">Социальные сети</h4>
              <div className="social-links">
                <a href="#" className="social-icon"><i className="fab fa-vk"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-telegram"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-whatsapp"></i></a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()}, Отель "Эльбрус-Плаза". Все права защищены.
          </p>
          <p className="developer">
            Разработано: Команда "Эльбрус-Плаза"
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;