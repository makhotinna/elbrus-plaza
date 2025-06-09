import React from "react";
//import avatar1 from "C:/Users/lapa_/OneDrive/Рабочий стол/Elbrus-Hotel/my-app/src/pagers/MainPage/image/lera.png"; 
//import avatar2 from "C:/Users/lapa_/OneDrive/Рабочий стол/Elbrus-Hotel/my-app/src/pagers/MainPage/image/yarik.png";
//import avatar3 from "C:/Users/lapa_/OneDrive/Рабочий стол/Elbrus-Hotel/my-app/src/pagers/MainPage/image/nikita.png";

import avatar1 from "../image/lera.png"; 
import avatar2 from "../image/yarik.png";
import avatar3 from "../image/nikita.png";


interface Review {
  id: number;
  author: string;
  date: string;
  text: string;
  avatar: string;
  rating: number;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span 
          key={star} 
          className={`star ${star <= rating ? 'filled' : ''}`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const Reviews: React.FC = () => {
  const reviews: Review[] = [
    {
      id: 1,
      author: "Махотина Валерия",
      date: "16 марта 2024 года",
      text: "Отель «Эльбрус-Плаза» — это идеальное сочетание комфорта и горной романтики, спасибо за незабываемый отдых!",
      avatar: avatar1,
      rating: 5
    },
    {
      id: 2,
      author: "Ярослав Киселев",
      date: "25 марта 2024 года",
      text: "Чистые номера, вкусные завтраки и потрясающий вид на горы — все на высшем уровне!",
      avatar: avatar2,
      rating: 4
    },
    {
      id: 3,
      author: "Королев Никита",
      date: "25 марта 2024 года",
      text: "Очень уютно и атмосферно, персонал внимательный, обязательно вернемся сюда снова!",
      avatar: avatar3,
      rating: 5
    }
  ];

  return (
    <section className="reviews-section">
      <h2 className="section-title1">ОТЗЫВЫ</h2>
      
      <div className="reviews-container">
        {reviews.map((review, index) => (
          <div 
            key={review.id} 
            className="review-card"
            style={{ '--index': index } as React.CSSProperties}
          >
            <div className="review-header">
              <img 
                src={review.avatar} 
                alt={review.author}
                className="review-avatar"
              />
              <div className="review-author-info">
                <h3 className="review-author">{review.author}</h3>
                <span className="review-date">{review.date}</span>
                <StarRating rating={review.rating} />
              </div>
            </div>
            <blockquote className="review-text">
              {review.text}
            </blockquote>
          </div>
        ))}
      </div>
    </section>
  );
};


export default Reviews;