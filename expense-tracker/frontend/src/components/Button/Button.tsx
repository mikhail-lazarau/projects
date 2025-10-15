import React from 'react';
import { Loader } from '../Loader';
import styles from './Button.module.css';

export type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  /**
   * @default false
   */
  disabled?: boolean;
  /**
   * @default false
   */
  loading?: boolean;
  /**
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary';
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  variant = 'primary',
}) => {
  const buttonClasses = `
    ${styles.button}
    ${styles[variant]}
    ${disabled || loading ? styles.disabled : ''}
  `;

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
    >
      <span className={loading ? styles['text-hidden'] : ''}>{children}</span>
      {loading && (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}
    </button>
  );
};
