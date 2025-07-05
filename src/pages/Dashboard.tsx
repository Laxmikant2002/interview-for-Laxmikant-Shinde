import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SubheaderFilters from '../components/SubheaderFilters';
import Table, { demoLaunches } from '../components/Table';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';
import { LaunchData, FilterOptions } from '../types';

const Dashboard: React.FC = () => {
  const [filteredLaunches, setFilteredLaunches] = useState<LaunchData[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: '6m', // default to Past 6 Months
    status: 'All',
    searchTerm: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      let launches = demoLaunches;
      // Date range filter (for demo, just filter by value string)
      // In a real app, you'd filter by actual date range
      // For now, just pass through all launches
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
      <SubheaderFilters
        dateValue={filters.dateRange as string}
        onDateChange={dateRange => setFilters(f => ({ ...f, dateRange }))}
        statusValue={filters.status}
        onStatusChange={status => setFilters(f => ({ ...f, status }))}
      />
      <main className="main-content">
        <div className="dashboard-container">
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
