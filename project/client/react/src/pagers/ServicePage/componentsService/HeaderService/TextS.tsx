import React from 'react';

const textStyle: React.CSSProperties = {
    position: 'absolute',
    top: '40%',
    left: '10%',
    color: 'white',
    fontSize: '60px',
    fontWeight: '300',
};


const TextHeaderS: React.FC = () => {
    return (
        <div >
            <p style={textStyle}>СЕРВИС И <br></br>УСЛУГИ </p>
        </div>
    );
};

export default TextHeaderS;