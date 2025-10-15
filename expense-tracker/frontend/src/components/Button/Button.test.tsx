import { render, fireEvent } from '@testing-library/react';
import { Button } from './Button';
import styles from './Button.module.css';
import { describe, it, expect, vi } from 'vitest';

describe('Button', () => {
  it('renders children correctly', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    const { getByText } = render(
      <Button onClick={handleClick}>Click me</Button>,
    );
    fireEvent.click(getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when the disabled prop is true', () => {
    const handleClick = vi.fn();
    const { getByRole } = render(
      <Button onClick={handleClick} disabled>
        Click me
      </Button>,
    );
    const button = getByRole('button');
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('shows the loader and hides the text when loading', () => {
    const { getByRole, getByLabelText } = render(
      <Button loading>Click me</Button>,
    );

    // 1. The loader should be present by its ARIA label.
    expect(getByLabelText('Loading')).toBeInTheDocument();

    // 2. The button's text content should still exist for screen readers.
    const button = getByRole('button');
    expect(button.textContent).toBe('Click me');

    // 3. The span containing the text should have the 'textHidden' class.
    const textSpan = button.querySelector('span');
    expect(textSpan).toHaveClass(styles['text-hidden']);
  });
});
