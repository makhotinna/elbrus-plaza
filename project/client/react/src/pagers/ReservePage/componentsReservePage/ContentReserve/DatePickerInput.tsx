// ComponentsCalendar/Card/DatePickerInput.tsx
import { Input } from 'antd';
import React from 'react';

interface DatePickerInputProps {
  placeholder?: string;
  value?: string;
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export const DatePickerInput: React.FC<DatePickerInputProps> = ({
  placeholder = '',
  value = '',
  onClick = () => {},
  disabled = false,
  style = {}
}) => {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      readOnly
      onClick={onClick}
      disabled={disabled}
      style={{
        height: '48px',
        borderRadius: '4px',
        border: '1px solid #d9d9d9',
        padding: '12px',
        fontSize: '16px',
        ...style
      }}
    />
  );
};