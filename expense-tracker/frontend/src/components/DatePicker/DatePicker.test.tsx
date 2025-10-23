import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DatePicker } from './DatePicker';

describe('DatePicker', () => {
  const mockOnChange = vi.fn();

  const defaultProps = {
    value: new Date(),
    onChange: mockOnChange,
    placeholder: 'Select a date',
  };

  it('renders with placeholder', () => {
    render(<DatePicker {...defaultProps} value={null as any} />);
    expect(screen.getByPlaceholderText('Select a date')).toBeInTheDocument();
  });

  it('renders with a value', () => {
    const date = new Date(2023, 7, 18);
    render(<DatePicker {...defaultProps} value={date} />);
    expect(screen.getByDisplayValue('18 / 08 / 2023')).toBeInTheDocument();
  });

  it('opens the day picker on focus', () => {
    render(<DatePicker {...defaultProps} />);
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('calls onChange when a day is clicked', () => {
    render(<DatePicker {...defaultProps} />);
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    const day = screen.getByText('15');
    fireEvent.click(day);
    expect(mockOnChange).toHaveBeenCalled();
  });
});
