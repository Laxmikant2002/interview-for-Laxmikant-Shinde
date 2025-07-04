import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Filter from '../components/Filter';
import Table, { demoLaunches } from '../components/Table';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';
import { LaunchData, FilterOptions } from '../types';

const Dashboard: React.FC = () => {
  const [filteredLaunches, setFilteredLaunches] = useState<LaunchData[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: '',
    status: 'All',
    searchTerm: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      let launches = demoLaunches;
      // Date range filter
      if (
        filters.dateRange &&
        typeof filters.dateRange === 'object' &&
        'startDate' in filters.dateRange &&
        'endDate' in filters.dateRange &&
        filters.dateRange.startDate &&
        filters.dateRange.endDate
      ) {
        const start = new Date(filters.dateRange.startDate as Date).getTime();
        const end = new Date(filters.dateRange.endDate as Date).getTime();
        launches = launches.filter((launch) => {
          const launchTime = new Date(launch.date).getTime();
          return launchTime >= start && launchTime <= end;
        });
      }
      // Status filter
      if (filters.status === 'Upcoming') {
        launches = launches.filter((launch) => launch.upcoming);
      } else if (filters.status === 'Success') {
        launches = launches.filter((launch) => launch.success === true);
      } else if (filters.status === 'Failed') {
        launches = launches.filter((launch) => launch.success === false);
      }
      setFilteredLaunches(launches);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [filters.dateRange, filters.status]);

  return (
    <div className="dashboard">
      <Header title="SpaceX Launch Dashboard" />
      <main className="main-content">
        <div className="dashboard-container">
          <Filter 
            onFilterChange={setFilters}
            currentFilter={filters}
          />
          <div className="results-summary">
            <p>
              Showing {filteredLaunches.length} launches
              {filters.searchTerm && ` matching "${filters.searchTerm}"`}
            </p>
          </div>
          <Table
            onRowClick={() => {}}
            filteredLaunches={filteredLaunches}
            loading={loading}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
