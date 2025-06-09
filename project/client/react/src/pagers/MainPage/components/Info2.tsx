import React from "react";
//import info1 from "C:/Users/lapa_/OneDrive/Рабочий стол/Elbrus-Hotel/my-app/src/pagers/MainPage/image/info1.jpg"
//import info2 from "C:/Users/lapa_/OneDrive/Рабочий стол/Elbrus-Hotel/my-app/src/pagers/MainPage/image/info2.jpg"
//import info3 from "C:/Users/lapa_/OneDrive/Рабочий стол/Elbrus-Hotel/my-app/src/pagers/MainPage/image/info3.jpg"
//import info4 from "C:/Users/lapa_/OneDrive/Рабочий стол/Elbrus-Hotel/my-app/src/pagers/MainPage/image/info4.jpg"

import info1 from "../image/info1.jpg";
import info2 from "../image/info2.jpg"; 
import info3 from "../image/info3.jpg";
import info4 from "../image/info4.jpg";

const Info2: React.FC = () => {
    return (
      <section className="info-section">
        <div className="info-container">
          <div className="info-header">
            <p className="section-title">РАЗМЕЩЕНИЕ</p>
            <p className="section-subtitle">НАСЛАЖДАЙТЕСЬ ОТДЫХОМ В УЮТЕ И КОМФОРТЕ</p>
          </div>
          
          <div className="info-image">
            <div className="inf1">
                <img src = {info1} className="inf-pic"></img>
                <button className="inf1-btn">
                    НОМЕРА
                </button>
            </div>    
            <div className="inf2">
                <img src = {info2 } className="inf-pic"></img>
                <button className="inf2-btn">
                    РЕСТОРАН
                </button>
            </div>
            <div className="inf3">
                <img src = {info3} className="inf-pic"></img>
                <button className="inf3-btn">
                    СПА-ПРОЦЕДУРЫ
                </button>
            </div>
            <div className="inf4">
                <img src = {info4} className="inf-pic"></img>
                <button className="inf4-btn">
                    АЛЬПИНИЙСКИЙ ГИД
                </button>
            </div>            
          </div>
        </div>
      </section>
    );
  };
  
  export default Info2;