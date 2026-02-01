import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

describe('Header', () => {
  it('renders the school name', () => {
    render(<Header />);
    expect(screen.getByText('Mergington High School')).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<Header />);
    expect(screen.getByText('Extracurricular Activities')).toBeInTheDocument();
  });

  it('renders as a header element', () => {
    const { container } = render(<Header />);
    const header = container.querySelector('header');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('header');
  });
});
