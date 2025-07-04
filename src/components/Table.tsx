import React from 'react';
import { LaunchData } from '../types';

// Expanded demo/mock data for table
const demoLaunches: LaunchData[] = [
  {
    id: '1',
    number: 1,
    date: '2006-03-24T22:30:00Z',
    launchpad: 'Kwajalein Atoll',
    mission: 'FalconSat',
    success: false,
    upcoming: false,
    rocket: 'Falcon 1',
    details: 'Demo details for FalconSat. Orbit: LEO',
    links: { patch: { small: '', large: '' }, webcast: '', article: '', wikipedia: '' },
    cores: [],
    payloads: [],
  },
  {
    id: '2',
    number: 2,
    date: '2008-09-28T23:15:00Z',
    launchpad: 'Kwajalein Atoll',
    mission: 'RatSat',
    success: true,
    upcoming: false,
    rocket: 'Falcon 1',
    details: 'Demo details for RatSat. Orbit: LEO',
    links: { patch: { small: '', large: '' }, webcast: '', article: '', wikipedia: '' },
    cores: [],
    payloads: [],
  },
  {
    id: '3',
    number: 3,
    date: '2010-06-04T18:45:00Z',
    launchpad: 'CCAFS SLC 40',
    mission: 'Falcon 9 Test Flight',
    success: true,
    upcoming: false,
    rocket: 'Falcon 9',
    details: 'Demo details for Falcon 9 Test Flight. Orbit: LEO',
    links: { patch: { small: '', large: '' }, webcast: '', article: '', wikipedia: '' },
    cores: [],
    payloads: [],
  },
  {
    id: '4',
    number: 4,
    date: '2020-12-06T16:17:00Z',
    launchpad: 'KSC LC 39A',
    mission: 'CRS-21',
    success: null,
    upcoming: true,
    rocket: 'Falcon 9',
    details: 'Demo details for CRS-21. Orbit: ISS',
    links: { patch: { small: '', large: '' }, webcast: '', article: '', wikipedia: '' },
    cores: [],
    payloads: [],
  },
  {
    id: '5',
    number: 5,
    date: '2021-03-14T10:01:00Z',
    launchpad: 'VAFB SLC 4E',
    mission: 'Starlink-21',
    success: true,
    upcoming: false,
    rocket: 'Falcon 9',
    details: 'Demo details for Starlink-21. Orbit: LEO',
    links: { patch: { small: '', large: '' }, webcast: '', article: '', wikipedia: '' },
    cores: [],
    payloads: [],
  },
  {
    id: '6',
    number: 6,
    date: '2022-05-18T22:30:00Z',
    launchpad: 'KSC LC 39A',
    mission: 'Transporter-5',
    success: false,
    upcoming: false,
    rocket: 'Falcon 9',
    details: 'Demo details for Transporter-5. Orbit: SSO',
    links: { patch: { small: '', large: '' }, webcast: '', article: '', wikipedia: '' },
    cores: [],
    payloads: [],
  },
  {
    id: '7',
    number: 7,
    date: '2023-01-10T14:00:00Z',
    launchpad: 'CCAFS SLC 40',
    mission: 'Starlink-30',
    success: null,
    upcoming: true,
    rocket: 'Falcon 9',
    details: 'Demo details for Starlink-30. Orbit: LEO',
    links: { patch: { small: '', large: '' }, webcast: '', article: '', wikipedia: '' },
    cores: [],
    payloads: [],
  },
];

interface TableProps {
  filteredLaunches: LaunchData[];
  onRowClick: (launch: LaunchData) => void;
  loading: boolean;
}

function extractOrbit(details: string | null): string {
  if (!details) return '-';
  const match = details.match(/Orbit: ([A-Z0-9]+)/);
  return match ? match[1] : '-';
}

const Table: React.FC<TableProps> = ({ onRowClick, filteredLaunches, loading }) => {
  const launches = filteredLaunches;

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
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

  return (
    <div className="table-container polished-table">
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
            {loading ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', height: '300px' }}>
                  <div className="loading-spinner">
                    <div className="spinner"></div>
                  </div>
                </td>
              </tr>
            ) : launches.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', height: '300px' }}>
                  <div className="no-data">
                    No results found for the specified filter
                  </div>
                </td>
              </tr>
            ) : (
              launches.map((launch) => (
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
                  <td className="number-cell">{launch.number.toString().padStart(2, '0')}</td>
                  <td className="date-cell">{formatDate(launch.date)}</td>
                  <td className="location-cell">{launch.launchpad}</td>
                  <td className="mission-cell">{launch.mission}</td>
                  <td className="orbit-cell">{extractOrbit(launch.details)}</td>
                  <td className="status-cell">
                    <span className={`status-badge ${getStatusClass(launch.success, launch.upcoming)}`}>
                      {getStatusText(launch.success, launch.upcoming)}
                    </span>
                  </td>
                  <td className="rocket-cell">{launch.rocket}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

export { demoLaunches };
