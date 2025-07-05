import React, { useState, useRef, useEffect } from 'react';

const dateOptions = [
  { label: 'Past 6 Months', value: '6m' },
  { label: 'Past Year', value: '1y' },
  { label: 'Past 3 Years', value: '3y' },
  { label: 'All Time', value: 'all' },
];
const statusOptions = [
  { label: 'All Launches', value: 'All' },
  { label: 'Upcoming Launches', value: 'Upcoming' },
  { label: 'Successful Launches', value: 'Success' },
  { label: 'Failed Launches', value: 'Failed' },
];

const CalendarIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{marginRight: 8, verticalAlign: 'middle'}}>
    <rect x="3" y="5" width="18" height="16" rx="2" fill="#fff" stroke="#2563eb" strokeWidth="2"/>
    <path d="M16 3v4M8 3v4" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/>
    <path d="M3 9h18" stroke="#2563eb" strokeWidth="2"/>
  </svg>
);
const FunnelIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{marginRight: 8, verticalAlign: 'middle'}}>
    <path stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-7 7V20a1 1 0 01-2 0v-6.293l-7-7A1 1 0 013 6V4z" />
  </svg>
);
const ArrowIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{marginLeft: 6, verticalAlign: 'middle'}}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

function useDropdown(initial = false) {
  const [open, setOpen] = useState(initial);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return { open, setOpen, ref };
}

const SubheaderFilters: React.FC<{
  dateValue: string;
  onDateChange: (value: string) => void;
  statusValue: string;
  onStatusChange: (value: string) => void;
}> = ({ dateValue, onDateChange, statusValue, onStatusChange }) => {
  const dateDropdown = useDropdown();
  const statusDropdown = useDropdown();
  const currentDateLabel = dateOptions.find(opt => opt.value === dateValue)?.label || 'Past 6 Months';
  const currentStatusLabel = statusOptions.find(opt => opt.value === statusValue)?.label || 'All Launches';

  return (
    <div className="subheader-filters-row">
      <div className="subheader-filter-left">
        <div className="subheader-dropdown-container" ref={dateDropdown.ref}>
          <button
            className="subheader-dropdown-btn"
            onClick={() => dateDropdown.setOpen(o => !o)}
            aria-haspopup="listbox"
            aria-expanded={dateDropdown.open}
          >
            <CalendarIcon />
            {currentDateLabel}
            <ArrowIcon />
          </button>
          {dateDropdown.open && (
            <div className="subheader-dropdown-menu">
              {dateOptions.map(option => (
                <div
                  key={option.value}
                  className={`subheader-dropdown-item${option.value === dateValue ? ' selected' : ''}`}
                  onClick={() => { onDateChange(option.value); dateDropdown.setOpen(false); }}
                  role="option"
                  aria-selected={option.value === dateValue}
                  tabIndex={0}
                  onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') { onDateChange(option.value); dateDropdown.setOpen(false); } }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="subheader-filter-right">
        <div className="subheader-dropdown-container" ref={statusDropdown.ref}>
          <button
            className="subheader-dropdown-btn"
            onClick={() => statusDropdown.setOpen(o => !o)}
            aria-haspopup="listbox"
            aria-expanded={statusDropdown.open}
          >
            <FunnelIcon />
            {currentStatusLabel}
            <ArrowIcon />
          </button>
          {statusDropdown.open && (
            <div className="subheader-dropdown-menu">
              {statusOptions.map(option => (
                <div
                  key={option.value}
                  className={`subheader-dropdown-item${option.value === statusValue ? ' selected' : ''}`}
                  onClick={() => { onStatusChange(option.value); statusDropdown.setOpen(false); }}
                  role="option"
                  aria-selected={option.value === statusValue}
                  tabIndex={0}
                  onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') { onStatusChange(option.value); statusDropdown.setOpen(false); } }}
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