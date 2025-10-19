import { render, screen, fireEvent } from '@testing-library/react';
import { InputLabel } from './InputLabel';
import styles from './InputLabel.module.css';
import { describe, it, expect, vi } from 'vitest';

describe('InputLabel', () => {
  it('renders the label and input', () => {
    render(<InputLabel label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('applies active class on focus', () => {
    const { container } = render(<InputLabel label="Email" />);
    const input = screen.getByLabelText('Email');
    fireEvent.focus(input);
    expect(container.firstChild).toHaveClass(styles.active);
  });

  it('applies active class when it has a value', () => {
    const { container } = render(<InputLabel label="Email" defaultValue="test@example.com" />);
    expect(container.firstChild).toHaveClass(styles.active);
  });

  it('calls onFocus handler when focused', () => {
    const handleFocus = vi.fn();
    render(<InputLabel label="Email" onFocus={handleFocus} />);
    const input = screen.getByLabelText('Email');
    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it('calls onBlur handler when blurred', () => {
    const handleBlur = vi.fn();
    render(<InputLabel label="Email" onBlur={handleBlur} />);
    const input = screen.getByLabelText('Email');
    fireEvent.focus(input);
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('calls onChange handler when text is entered', () => {
    const handleChange = vi.fn();
    render(<InputLabel label="Email" onChange={handleChange} />);
    const input = screen.getByLabelText('Email');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('spreads additional props to the input element', () => {
    render(<InputLabel label="Email" data-testid="custom-input" />);
    expect(screen.getByTestId('custom-input')).toBeInTheDocument();
  });

  it('applies a custom container class name', () => {
    const { container } = render(
      <InputLabel label="Email" containerClassName="my-custom-class" />
    );
    expect(container.firstChild).toHaveClass('my-custom-class');
  });
});
