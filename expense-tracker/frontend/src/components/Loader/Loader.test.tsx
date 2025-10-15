import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Loader } from './Loader';

describe('Loader component', () => {
  it('renders correctly', () => {
    const { getByLabelText } = render(<Loader />);
    expect(getByLabelText('Loading')).toBeInTheDocument();
  });
});
