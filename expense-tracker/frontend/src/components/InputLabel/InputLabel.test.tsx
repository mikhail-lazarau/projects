import { render, screen, fireEvent } from '@testing-library/react';
import { InputLabel } from './InputLabel';
import styles from './InputLabel.module.css';
import { describe, it, expect, vi } from 'vitest';

describe('InputLabel', () => {
  const defaultProps = {
    floatingLabel: 'Email',
    placeholderLabel: 'Enter your email',
  };

  it('renders the placeholder label by default', () => {
    render(<InputLabel {...defaultProps} />);
    expect(screen.getByLabelText(defaultProps.placeholderLabel)).toBeInTheDocument();
    expect(screen.queryByText(defaultProps.floatingLabel)).not.toBeInTheDocument();
  });

  it('renders the floating label and applies active class on focus', () => {
    const { container } = render(<InputLabel {...defaultProps} />);
    const input = screen.getByLabelText(defaultProps.placeholderLabel);
    fireEvent.focus(input);

    expect(container.firstChild).toHaveClass(styles.active);
    expect(screen.getByLabelText(defaultProps.floatingLabel)).toBeInTheDocument();
    expect(screen.queryByText(defaultProps.placeholderLabel)).not.toBeInTheDocument();
  });

  it('renders the floating label and applies active class when it has a value', () => {
    const { container } = render(
      <InputLabel {...defaultProps} defaultValue="test@example.com" />
    );
    expect(container.firstChild).toHaveClass(styles.active);
    expect(screen.getByLabelText(defaultProps.floatingLabel)).toBeInTheDocument();
  });

  it('calls onFocus handler when focused', () => {
    const handleFocus = vi.fn();
    render(<InputLabel {...defaultProps} onFocus={handleFocus} />);
    const input = screen.getByLabelText(defaultProps.placeholderLabel);
    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it('calls onBlur handler when blurred', () => {
    const handleBlur = vi.fn();
    render(<InputLabel {...defaultProps} onBlur={handleBlur} />);
    const input = screen.getByLabelText(defaultProps.placeholderLabel);
    fireEvent.focus(input);
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('calls onChange handler when text is entered', () => {
    const handleChange = vi.fn();
    render(<InputLabel {...defaultProps} onChange={handleChange} />);
    const input = screen.getByLabelText(defaultProps.placeholderLabel);
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('spreads additional props to the input element', () => {
    render(<InputLabel {...defaultProps} data-testid="custom-input" />);
    expect(screen.getByTestId('custom-input')).toBeInTheDocument();
  });

  it('applies a custom container class name', () => {
    const { container } = render(
      <InputLabel {...defaultProps} containerClassName="my-custom-class" />
    );
    expect(container.firstChild).toHaveClass('my-custom-class');
  });
});
