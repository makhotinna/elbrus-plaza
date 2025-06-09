import React from 'react';

const textStyle: React.CSSProperties = {
    position: 'absolute',
    top: '30%',
    left: '10%',
    color: 'white',
    fontSize: '60px',
    fontWeight: '300', 
};

const abs: React.CSSProperties = {
    position: 'absolute',
    top: '60%',
    left: '10%',
    color: 'white',
    fontSize: '25px',
    fontWeight: '300', 
};


const TextHeaderLP: React.FC = () => {
    return (
        <div >
            <p style={textStyle}>ПРОГРАММА <br></br>ЛОЯЛЬНОСТИ </p>
            <p style={abs}>Добро пожаловать в программу лояльности <br/>отеля «Эльбрус-Плаза»! Мы ценим ваше<br/> доверие и вознаграждаем каждого гостя <br/>за выбор нашего отеля.  </p>
        </div>
    );
};

export default TextHeaderLP;