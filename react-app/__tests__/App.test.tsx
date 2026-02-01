import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText(/Mergington High School/i)).toBeInTheDocument();
  });

  it('contains Header component', () => {
    render(<App />);
    expect(screen.getByText(/Extracurricular Activities/i)).toBeInTheDocument();
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
