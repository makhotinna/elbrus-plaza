import React from "react";
//import im1 from "C:/Users/lapa_/OneDrive/Рабочий стол/Elbrus-Hotel/my-app/src/pagers/MainPage/image/vine.png";
//import im2 from "C:/Users/lapa_/OneDrive/Рабочий стол/Elbrus-Hotel/my-app/src/pagers/MainPage/image/bread.png";
//import im3 from "C:/Users/lapa_/OneDrive/Рабочий стол/Elbrus-Hotel/my-app/src/pagers/MainPage/image/yoga.png";
import im1 from "../image/vine.png";
import im2 from "../image/bread.png";
import im3 from "../image/yoga.png";


interface Event {
  id: number;
  period: string;
  title: string;
  time: string;
  place: string;
  image: string;
}

const EventsPoster: React.FC = () => {
  const events: Event[] = [
    {
      id: 1,
      period: "1-15 АПРЕЛЯ",
      title: "НЕДЕЛЯ ВЕСЕННЕГО НАСТРОЕНИЯ",
      time: "18:00 каждый день",
      place: "ВИН-ПАРК",
      image: im1
    },
    {
      id: 2,
      period: "18-25 АПРЕЛЯ",
      title: "КУЛИНАРНЫЙ МАСТЕР-КЛАСС 'БЛЮДА КАВКАЗА'",
      time: "18:00 каждый день",
      place: "РЕСТОРАН",
      image: im2
    },
    {
      id: 3,
      period: "27-30 АПРЕЛЯ",
      title: "МЕДИТАЦИИ ПОД ЗВУКИ ПРИРОДЫ",
      time: "8:00 каждый день",
      place: "СПОРТ ЗАЛ",
      image: im3
    }
  ];

  return (
    <section className="events-poster">
      <div className="poster-header">
        <h2 className="poster-title">АФИША МЕРОПРИЯТИЙ</h2>
      </div>
      
      <div className="events-horizontal-container">
        {events.map(event => (
          <div key={event.id} className="event-card-horizontal">
            <div className="event-image-container">
              <img 
                src={event.image} 
                alt={event.title} 
                className="event-image"
              />
              <div className="event-date-overlay">
                <div className="event-period">{event.period}</div>
              </div>
            </div>
            
            <div className="event-content">
              <h3 className="event-title">{event.title}</h3>
              
              <div className="event-details">
                <div className="detail-item">
                  <span className="detail-label">ВРЕМЯ</span>
                  <span className="detail-value">{event.time}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">МЕСТО</span>
                  <span className="detail-value">{event.place}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
       
    </section>
  );
};

export default EventsPoster;