import React, { useState, useId } from 'react';
import styles from './InputLabel.module.css';

export interface InputLabelProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'> {
  floatingLabel: string;
  placeholderLabel: string;
  containerClassName?: string;
}

export const InputLabel: React.FC<InputLabelProps> = ({
  floatingLabel,
  placeholderLabel,
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
        {isLabelFloating ? floatingLabel : placeholderLabel}
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
