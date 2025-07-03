import React from 'react';
import { FilterProps } from '../types';

const Filter: React.FC<FilterProps> = ({ onFilterChange, currentFilter }) => {
  const handleDateRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...currentFilter,
      dateRange: event.target.value
    });
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...currentFilter,
      status: event.target.value
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...currentFilter,
      searchTerm: event.target.value
    });
  };

  return (
    <div className="filter-container">
      <div className="filter-group">
        <label htmlFor="date-range" className="filter-label">
          Time Range:
        </label>
        <select
          id="date-range"
          value={currentFilter.dateRange}
          onChange={handleDateRangeChange}
          className="filter-select"
        >
          <option value="All Launches">All Launches</option>
          <option value="Past 6 Months">Past 6 Months</option>
          <option value="Past Year">Past Year</option>
          <option value="Past 3 Years">Past 3 Years</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="status" className="filter-label">
          Launch Status:
        </label>
        <select
          id="status"
          value={currentFilter.status}
          onChange={handleStatusChange}
          className="filter-select"
        >
          <option value="All">All</option>
          <option value="Success">Success</option>
          <option value="Failed">Failed</option>
          <option value="Upcoming">Upcoming</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="search" className="filter-label">
          Search Mission:
        </label>
        <input
          id="search"
          type="text"
          value={currentFilter.searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by mission name..."
          className="filter-input"
        />
      </div>
    </div>
  );
};

export default Filter;
