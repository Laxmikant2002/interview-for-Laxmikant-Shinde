import React from 'react';
import { TableProps, LaunchStatus } from '../types';

const Table: React.FC<TableProps> = ({ launches, onRowClick, loading, error }) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusClass = (success: boolean | null, upcoming: boolean): string => {
    if (upcoming) return 'status-upcoming';
    if (success === true) return 'status-success';
    if (success === false) return 'status-failed';
    return 'status-unknown';
  };

  const getStatusText = (success: boolean | null, upcoming: boolean): string => {
    if (upcoming) return 'Upcoming';
    if (success === true) return 'Success';
    if (success === false) return 'Failed';
    return 'Unknown';
  };

  if (loading) {
    return (
      <div className="table-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading SpaceX launches...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="table-container">
        <div className="error-message">
          <p>Error loading launches: {error}</p>
          <button onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (launches.length === 0) {
    return (
      <div className="table-container">
        <div className="no-data">
          <p>No launches found matching your criteria.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="launches-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Launched (UTC)</th>
              <th>Location</th>
              <th>Mission</th>
              <th>Orbit</th>
              <th>Launch Status</th>
              <th>Rocket</th>
            </tr>
          </thead>
          <tbody>
            {launches.map((launch, index) => (
              <tr
                key={launch.id}
                className="table-row"
                onClick={() => onRowClick(launch)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onRowClick(launch);
                  }
                }}
              >
                <td className="number-cell">{launch.number}</td>
                <td className="date-cell">{formatDate(launch.date)}</td>
                <td className="location-cell">{launch.launchpad}</td>
                <td className="mission-cell">{launch.mission}</td>
                <td className="orbit-cell">
                  {launch.upcoming ? 'TBD' : 'LEO'}
                </td>
                <td className="status-cell">
                  <span className={`status-badge ${getStatusClass(launch.success, launch.upcoming)}`}>
                    {getStatusText(launch.success, launch.upcoming)}
                  </span>
                </td>
                <td className="rocket-cell">{launch.rocket}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
