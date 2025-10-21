import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Icon } from './Icon';

describe('Icon', () => {
  it('renders the icon with the correct name', async () => {
    render(<Icon iconName="plus" />)

    const icon = screen.getByRole('img', { name: 'plus' });
    expect(icon).toBeInTheDocument();
  });

  it('applies the correct size', () => {
    render(<Icon iconName="bell" size={{ width: 32, height: 32 }} />);

    const icon = screen.getByRole('img', { name: 'bell' });
    expect(icon).toHaveStyle('width: 32px');
    expect(icon).toHaveStyle('height: 32px');
  });
});
