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
    <div className="filter-container">
      <div className="filter-group">
        <label className="filter-label">Date Range:</label>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="date"
            value={formatDateForInput(dateRange.startDate)}
            onChange={(e) => handleDateChange('start', e.target.value)}
            className="filter-input"
          />
          <span>to</span>
          <input
            type="date"
            value={formatDateForInput(dateRange.endDate)}
            onChange={(e) => handleDateChange('end', e.target.value)}
            className="filter-input"
          />
        </div>
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
