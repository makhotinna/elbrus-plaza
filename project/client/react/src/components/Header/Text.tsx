import React from 'react';

const textStyle: React.CSSProperties = {
    position: 'absolute',
    top: '55%',
    left: '25%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontSize: '60px',
    fontWeight: '300', 
};

const TextHeader: React.FC = () => {
    return (
        <div style={textStyle}>
            РАЗМЕЩЕНИЕ
        </div>
    );
};

export default TextHeader;