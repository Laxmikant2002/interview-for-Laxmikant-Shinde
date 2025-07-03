import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from '../components/Table';
import { LaunchData } from '../types';

const mockLaunches: LaunchData[] = [
  {
    id: '1',
    number: 1,
    date: '2023-01-01T12:00:00.000Z',
    mission: 'Test Mission',
    rocket: 'Falcon 9',
    launchpad: 'KSC LC-39A',
    success: true,
    upcoming: false,
    details: 'Test mission details',
    links: {
      webcast: 'https://youtube.com/watch?v=test',
      article: 'https://example.com/article'
    },
    cores: [],
    payloads: []
  }
];

const mockProps = {
  launches: mockLaunches,
  onRowClick: jest.fn(),
  loading: false,
  error: null
};

describe('Table Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders table with launch data', () => {
    render(<Table {...mockProps} />);
    
    expect(screen.getByText('Test Mission')).toBeInTheDocument();
    expect(screen.getByText('Falcon 9')).toBeInTheDocument();
    expect(screen.getByText('KSC LC-39A')).toBeInTheDocument();
    expect(screen.getByText('Success')).toBeInTheDocument();
  });

  test('shows loading state', () => {
    render(<Table {...mockProps} loading={true} />);
    
    expect(screen.getByText('Loading SpaceX launches...')).toBeInTheDocument();
  });

  test('shows error state', () => {
    render(<Table {...mockProps} error="Test error" />);
    
    expect(screen.getByText('Error loading launches: Test error')).toBeInTheDocument();
  });

  test('shows no data state', () => {
    render(<Table {...mockProps} launches={[]} />);
    
    expect(screen.getByText('No launches found matching your criteria.')).toBeInTheDocument();
  });

  test('calls onRowClick when row is clicked', () => {
    render(<Table {...mockProps} />);
    
    const row = screen.getByRole('button');
    fireEvent.click(row);
    
    expect(mockProps.onRowClick).toHaveBeenCalledWith(mockLaunches[0]);
  });
});
