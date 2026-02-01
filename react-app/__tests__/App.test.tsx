import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { name: /Mergington High School/i, level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('contains Header component', () => {
    render(<App />);
    const subheading = screen.getByRole('heading', { name: /Extracurricular Activities/i, level: 2 });
    expect(subheading).toBeInTheDocument();
  });

  it('contains LandingPage component', () => {
    render(<App />);
    expect(screen.getByText(/Welcome to Our Activities Portal/i)).toBeInTheDocument();
  });

  it('contains Footer component', () => {
    render(<App />);
    expect(screen.getByText(/© 2023 Mergington High School/i)).toBeInTheDocument();
  });
});
