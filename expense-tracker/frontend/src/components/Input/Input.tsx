import React, { useState, useId } from 'react';
import styles from './Input.module.css';

export interface InputLabelProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label: {
    floating: string;
    placeholder: string;
  };
  containerClassName?: string;
}

const InputLabelComponent: React.FC<InputLabelProps> = ({
  label,
  containerClassName,
  onFocus,
  onBlur,
  onChange,
  value,
  defaultValue,
  ...props
}) => {
  const id = useId();
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue || value || '');
  const hasValue = internalValue !== '';

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    onChange?.(e);
  };

  const isLabelFloating = isFocused || hasValue;

  const containerClasses = [
    styles.container,
    isLabelFloating ? styles.active : '',
    containerClassName,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      <label htmlFor={id} className={styles.label}>
        {isLabelFloating ? label.floating : label.placeholder}
      </label>
      <input
        id={id}
        className={styles.input}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        value={internalValue}
        {...props}
      />
    </div>
  );
};

export const Input = React.memo(InputLabelComponent);
