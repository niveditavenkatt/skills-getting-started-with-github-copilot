import React from 'react';
import Activities from './Activities';

const LandingPage: React.FC = () => {
  return (
    <main className="landing-page">
      <section className="welcome-section">
        <h2>Welcome to Our Activities Portal</h2>
        <p>
          Explore and sign up for exciting extracurricular activities at Mergington High School.
          Join clubs, learn new skills, and make lasting friendships!
        </p>
      </section>
      <Activities />
    </main>
  );
};

export default LandingPage;
