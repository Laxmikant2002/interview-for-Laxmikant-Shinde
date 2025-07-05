import React, { useState, useRef, useEffect } from 'react';
import { FilterOptions } from '../types';

interface SubheaderFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  currentFilter: FilterOptions;
}

const SubheaderFilters: React.FC<SubheaderFiltersProps> = ({ onFilterChange, currentFilter }) => {
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const dateDropdownRef = useRef<HTMLDivElement>(null);
  const statusDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dateDropdownRef.current && !dateDropdownRef.current.contains(event.target as Node)) {
        setDateDropdownOpen(false);
      }
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target as Node)) {
        setStatusDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const dateOptions = [
    { value: '', label: 'All Dates' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: '2021', label: '2021' },
    { value: '2020', label: '2020' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'success', label: 'Successful' },
    { value: 'failed', label: 'Failed' },
    { value: 'upcoming', label: 'Upcoming' }
  ];

  const handleDateChange = (value: string) => {
    onFilterChange({ ...currentFilter, dateRange: value });
    setDateDropdownOpen(false);
  };

  const handleStatusChange = (value: string) => {
    onFilterChange({ ...currentFilter, status: value });
    setStatusDropdownOpen(false);
  };

  const getDateLabel = () => {
    const option = dateOptions.find(opt => opt.value === currentFilter.dateRange);
    return option ? option.label : 'All Dates';
  };

  const getStatusLabel = () => {
    const option = statusOptions.find(opt => opt.value === currentFilter.status);
    return option ? option.label : 'All Status';
  };

  return (
    <div className="subheader-filters-row">
      <div className="subheader-filter-left">
        <div className="subheader-dropdown-container" ref={dateDropdownRef}>
          <button
            className="subheader-dropdown-btn"
            onClick={() => setDateDropdownOpen(!dateDropdownOpen)}
            aria-expanded={dateDropdownOpen}
            aria-haspopup="true"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            {getDateLabel()}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6,9 12,15 18,9"/>
            </svg>
          </button>
          
          {dateDropdownOpen && (
            <div className="subheader-dropdown-menu">
              {dateOptions.map((option) => (
                <div
                  key={option.value}
                  className={`subheader-dropdown-item ${currentFilter.dateRange === option.value ? 'selected' : ''}`}
                  onClick={() => handleDateChange(option.value)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="subheader-filter-right">
        <div className="subheader-dropdown-container" ref={statusDropdownRef}>
          <button
            className="subheader-dropdown-btn"
            onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
            aria-expanded={statusDropdownOpen}
            aria-haspopup="true"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3"/>
            </svg>
            {getStatusLabel()}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6,9 12,15 18,9"/>
            </svg>
          </button>
          
          {statusDropdownOpen && (
            <div className="subheader-dropdown-menu">
              {statusOptions.map((option) => (
                <div
                  key={option.value}
                  className={`subheader-dropdown-item ${currentFilter.status === option.value ? 'selected' : ''}`}
                  onClick={() => handleStatusChange(option.value)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubheaderFilters;