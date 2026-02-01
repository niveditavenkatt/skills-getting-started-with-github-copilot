import React from 'react';

interface Activity {
  name: string;
  description: string;
  schedule: string;
}

const Activities: React.FC = () => {
  const activities: Activity[] = [
    {
      name: 'Chess Club',
      description: 'Learn strategies and compete in chess tournaments',
      schedule: 'Fridays, 3:30 PM - 5:00 PM'
    },
    {
      name: 'Programming Class',
      description: 'Learn programming fundamentals and build software projects',
      schedule: 'Tuesdays and Thursdays, 3:30 PM - 4:30 PM'
    },
    {
      name: 'Gym Class',
      description: 'Physical education and sports activities',
      schedule: 'Mondays, Wednesdays, Fridays, 2:00 PM - 3:00 PM'
    }
  ];

  return (
    <section className="activities">
      <h3>Available Activities</h3>
      <div className="activities-list">
        {activities.map((activity) => (
          <div key={activity.name} className="activity-card">
            <h4>{activity.name}</h4>
            <p>{activity.description}</p>
            <p className="schedule">{activity.schedule}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Activities;
