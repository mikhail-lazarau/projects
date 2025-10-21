import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';
import styles from './Input.module.css';
import { describe, it, expect, vi } from 'vitest';

describe('Input', () => {
  const defaultProps = {
    label: {
      floating: 'Email',
      placeholder: 'Enter your email',
    },
  };

  it('renders the placeholder label by default', () => {
    render(<Input {...defaultProps} />);
    expect(screen.getByLabelText(defaultProps.label.placeholder)).toBeInTheDocument();
    expect(screen.queryByText(defaultProps.label.floating)).not.toBeInTheDocument();
  });

  it('renders the floating label and applies active class on focus', () => {
    const { container } = render(<Input {...defaultProps} />);
    const input = screen.getByLabelText(defaultProps.label.placeholder);
    fireEvent.focus(input);

    expect(container.firstChild).toHaveClass(styles.active);
    expect(screen.getByLabelText(defaultProps.label.floating)).toBeInTheDocument();
    expect(screen.queryByText(defaultProps.label.placeholder)).not.toBeInTheDocument();
  });

  it('renders the floating label and applies active class when it has a value', () => {
    const { container } = render(
      <Input {...defaultProps} defaultValue="test@example.com" />
    );
    expect(container.firstChild).toHaveClass(styles.active);
    expect(screen.getByLabelText(defaultProps.label.floating)).toBeInTheDocument();
  });

  it('calls onFocus handler when focused', () => {
    const handleFocus = vi.fn();
    render(<Input {...defaultProps} onFocus={handleFocus} />);
    const input = screen.getByLabelText(defaultProps.label.placeholder);
    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it('calls onBlur handler when blurred', () => {
    const handleBlur = vi.fn();
    render(<Input {...defaultProps} onBlur={handleBlur} />);
    const input = screen.getByLabelText(defaultProps.label.placeholder);
    fireEvent.focus(input);
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('calls onChange handler when text is entered', () => {
    const handleChange = vi.fn();
    render(<Input {...defaultProps} onChange={handleChange} />);
    const input = screen.getByLabelText(defaultProps.label.placeholder);
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('spreads additional props to the input element', () => {
    render(<Input {...defaultProps} data-testid="custom-input" />);
    expect(screen.getByTestId('custom-input')).toBeInTheDocument();
  });

  it('applies a custom container class name', () => {
    const { container } = render(
      <Input {...defaultProps} containerClassName="my-custom-class" />
    );
    expect(container.firstChild).toHaveClass('my-custom-class');
  });
});
