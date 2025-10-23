import React, { useState, useId, useRef, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import styles from './DatePicker.module.css';
import { Icon } from '../Icon/Icon';

export interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  placeholder: string;
  containerClassName?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder,
  containerClassName,
}) => {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  const hasValue = value instanceof Date && !isNaN(value.getTime());

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleDayClick = (date: Date) => {
    onChange(date);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const containerClasses = [styles.container, containerClassName].filter(Boolean).join(' ');

  return (
    <div className={containerClasses} ref={datePickerRef}>
      <div className={styles.inputContainer} onClick={handleFocus}>
        <input
          id={id}
          className={styles.input}
          value={hasValue ? format(value, 'dd / MM / yyyy') : ''}
          placeholder={placeholder}
          onFocus={handleFocus}
          readOnly
        />
        <Icon iconName="calendar" className={styles.icon} />
      </div>
      <div className={`${styles.dayPickerContainer} ${isOpen ? styles.open : ''}`}>
        {isOpen && (
          <DayPicker
            mode="single"
            selected={value}
            onSelect={(date) => date && handleDayClick(date)}
            initialFocus
          />
        )}
      </div>
    </div>
  );
};
