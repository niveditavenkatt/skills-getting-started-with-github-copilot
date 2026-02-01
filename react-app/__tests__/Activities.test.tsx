import React from 'react';
import { render, screen } from '@testing-library/react';
import Activities from '../components/Activities';

describe('Activities', () => {
  it('renders the activities heading', () => {
    render(<Activities />);
    expect(screen.getByText('Available Activities')).toBeInTheDocument();
  });

  it('renders all three activities', () => {
    render(<Activities />);
    expect(screen.getByText('Chess Club')).toBeInTheDocument();
    expect(screen.getByText('Programming Class')).toBeInTheDocument();
    expect(screen.getByText('Gym Class')).toBeInTheDocument();
  });

  it('renders activity descriptions', () => {
    render(<Activities />);
    expect(screen.getByText(/Learn strategies and compete in chess tournaments/i)).toBeInTheDocument();
    expect(screen.getByText(/Learn programming fundamentals and build software projects/i)).toBeInTheDocument();
    expect(screen.getByText(/Physical education and sports activities/i)).toBeInTheDocument();
  });

  it('renders activity schedules', () => {
    render(<Activities />);
    expect(screen.getByText(/Fridays, 3:30 PM - 5:00 PM/i)).toBeInTheDocument();
    expect(screen.getByText(/Tuesdays and Thursdays, 3:30 PM - 4:30 PM/i)).toBeInTheDocument();
    expect(screen.getByText(/Mondays, Wednesdays, Fridays, 2:00 PM - 3:00 PM/i)).toBeInTheDocument();
  });
});
