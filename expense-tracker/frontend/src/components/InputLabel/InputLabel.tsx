import React, { useState, useId } from 'react';
import styles from './InputLabel.module.css';

export interface InputLabelProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label: string;
  containerClassName?: string;
}

export const InputLabel: React.FC<InputLabelProps> = ({
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
  const [hasValue, setHasValue] = useState(!!value || !!defaultValue);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(!!e.target.value);
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
        {label}
      </label>
      <input
        id={id}
        className={styles.input}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        value={value}
        defaultValue={defaultValue}
        {...props}
      />
    </div>
  );
};
