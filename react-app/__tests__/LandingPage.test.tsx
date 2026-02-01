import React from 'react';
import { render, screen } from '@testing-library/react';
import LandingPage from '../components/LandingPage';

describe('LandingPage', () => {
  it('renders the welcome heading', () => {
    render(<LandingPage />);
    expect(screen.getByText('Welcome to Our Activities Portal')).toBeInTheDocument();
  });

  it('renders the welcome message', () => {
    render(<LandingPage />);
    expect(screen.getByText(/Explore and sign up for exciting extracurricular activities/i)).toBeInTheDocument();
  });

  it('contains the Activities component', () => {
    render(<LandingPage />);
    expect(screen.getByText('Available Activities')).toBeInTheDocument();
  });

  it('renders as a main element', () => {
    const { container } = render(<LandingPage />);
    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass('landing-page');
  });
});
