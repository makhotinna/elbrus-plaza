import React, { ReactNode } from 'react';

interface BaseNumberProps {
  CarouselComponent: React.ComponentType;
  description: ReactNode;
}

const BaseNumber: React.FC<BaseNumberProps> = ({ CarouselComponent, description }) => {
  const styles = {
    container: {
      display: 'flex',
      margin: '-10px',
      color: '#000',
      textAlign: 'left',
      marginLeft: '20px',
      marginTop: '-70px',
      gap: '30px',
      paddingRight: '30px',
      width: '100%',
      flexWrap: 'wrap',
      fontSize: '18px',
    } as React.CSSProperties,
    leftColumnItem: {
      paddingBottom: '10px',
      marginBottom: '10px',
    } as React.CSSProperties,
    rightColumn: {
      fontSize: '18px',
      lineHeight: '1.5',
      flex: 1,
      maxWidth: 'calc(100% - 273px - 30px - 30px)',
    } as React.CSSProperties,
    underline: {
      display: 'block',
      width: '273px',
      height: '1px',
      backgroundColor: '#8D8D8B',
      marginTop: '5px',
    } as React.CSSProperties,
  };

  return (
    <>
      <CarouselComponent />
      <div style={styles.container}>
        <div>
          <div>
            <strong>Количество спальных мест:</strong>
            <div style={styles.leftColumnItem}>
              до 4-х человек
              <span style={styles.underline}></span>
            </div>
          </div>
          <div>
            <strong>Вид из окон:</strong>
            <div>
              вид на горы
              <span style={styles.underline}></span>
            </div>
          </div>
        </div>
        <div style={styles.rightColumn}>
          {description}
        </div>
      </div>
    </>
  );
};

export default BaseNumber;