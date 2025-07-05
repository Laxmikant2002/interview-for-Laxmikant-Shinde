import React, { useState } from 'react';
import { FilterProps, DateRange } from '../types';

const Filter: React.FC<FilterProps> = ({ onFilterChange, currentFilter }) => {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleDateChange = (type: 'start' | 'end', value: string) => {
    const newDateRange = {
      ...dateRange,
      [type === 'start' ? 'startDate' : 'endDate']: value
    };
    setDateRange(newDateRange);
    onFilterChange({
      ...currentFilter,
      dateRange: newDateRange,
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...currentFilter,
      searchTerm: event.target.value,
    });
  };

  const formatDateForInput = (date: Date | string): string => {
    if (date instanceof Date) {
      return date.toISOString().split('T')[0];
    }
    return new Date(date).toISOString().split('T')[0];
  };

  return (
    <div className="filters-wrapper">
      <div className="filter-container">
        <div className="filter-group">
          <label className="filter-label">📅 Date Range:</label>
          <div className="date-range-inputs">
            <input
              type="date"
              value={formatDateForInput(dateRange.startDate)}
              onChange={(e) => handleDateChange('start', e.target.value)}
              className="filter-input date-input"
            />
            <span className="date-separator">to</span>
            <input
              type="date"
              value={formatDateForInput(dateRange.endDate)}
              onChange={(e) => handleDateChange('end', e.target.value)}
              className="filter-input date-input"
            />
          </div>
        </div>
        
        <div className="filter-group">
          <label htmlFor="search" className="filter-label">
            🔍 Search Mission:
          </label>
          <input
            id="search"
            type="text"
            value={currentFilter.searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by mission name..."
            className="filter-input search-input"
          />
        </div>
        
        <div className="filter-group">
          <label className="filter-label">🚀 Status:</label>
          <select 
            className="filter-select status-select"
            value={currentFilter.status || 'all'}
            onChange={(e) => onFilterChange({
              ...currentFilter,
              status: e.target.value === 'all' ? '' : e.target.value
            })}
          >
            <option value="all">All Statuses</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
