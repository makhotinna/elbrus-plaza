import React from 'react';

interface DatePickerInputProps {
  placeholder?: string;
  value?: string;
  onClick?: () => void;
  disabled?: boolean;
  isSelected?: boolean;
  labelType?: 'checkIn' | 'checkOut' | null;
  inputStyle?: React.CSSProperties;
  wrapperStyle?: React.CSSProperties;
}

export const DatePickerInput: React.FC<DatePickerInputProps> = ({
  placeholder = '',
  value = '',
  onClick = () => { },
  disabled = false,
  isSelected = false,
  labelType = null
}) => {
  return (
    <div
      className="ant-picker-input"
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        transform: 'translateY(-12px)',
      }}
    >
      <input
        placeholder={placeholder}
        value={value}
        readOnly
        className="ant-input"
        disabled={disabled}
        style={{
          fontSize: '23px',
          textAlign: 'center',
          width: '175px',
          backgroundColor: 'transparent',
          border: 'none',
          color: '#fff',
          outline: 'none',
          padding: '5px 0'
        }}
      />
      {isSelected && labelType && (
        <div style={{
          fontSize: '14px',
          color: '#D9D9D9',
        }}>
          {labelType === 'checkIn' ? 'Заезд' : 'Выезд'}
        </div>
      )}
    </div>
  );
};