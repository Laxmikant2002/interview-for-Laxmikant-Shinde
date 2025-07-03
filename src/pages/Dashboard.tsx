import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import Filter from '../components/Filter';
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';
import { spacexApi, formatLaunchData, getDateRange } from '../services/spacexApi';
import { LaunchData, FilterOptions, SpaceXLaunch, Rocket, Launchpad } from '../types';

const Dashboard: React.FC = () => {
  const [launches, setLaunches] = useState<LaunchData[]>([]);
  const [filteredLaunches, setFilteredLaunches] = useState<LaunchData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedLaunch, setSelectedLaunch] = useState<LaunchData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [rockets, setRockets] = useState<Rocket[]>([]);
  const [launchpads, setLaunchpads] = useState<Launchpad[]>([]);
  
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: 'All Launches',
    status: 'All',
    searchTerm: ''
  });

  const itemsPerPage = 10;

  // Load reference data (rockets and launchpads)
  const loadReferenceData = useCallback(async () => {
    try {
      const [rocketsData, launchpadsData] = await Promise.all([
        spacexApi.getRockets(),
        spacexApi.getLaunchpads()
      ]);
      setRockets(rocketsData);
      setLaunchpads(launchpadsData);
    } catch (err) {
      console.error('Error loading reference data:', err);
    }
  }, []);

  // Load launches data
  const loadLaunches = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let launchesData;
      
      if (filters.dateRange === 'All Launches') {
        const response = await spacexApi.getLaunches(1000, 0); // Get more launches for filtering
        launchesData = response.docs;
      } else {
        const dateRange = getDateRange(filters.dateRange);
        if (dateRange) {
          const response = await spacexApi.getLaunchesWithDateFilter(
            dateRange.startDate,
            dateRange.endDate,
            1000,
            0
          );
          launchesData = response.docs;
        } else {
          const response = await spacexApi.getLaunches(1000, 0);
          launchesData = response.docs;
        }
      }

      const formattedLaunches = formatLaunchData(launchesData, rockets, launchpads);
      setLaunches(formattedLaunches);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load launches');
      setLaunches([]);
    } finally {
      setLoading(false);
    }
  }, [filters.dateRange, rockets, launchpads]);

  // Apply filters to launches
  const applyFilters = useCallback(() => {
    let filtered = [...launches];

    // Filter by status
    if (filters.status !== 'All') {
      filtered = filtered.filter(launch => {
        switch (filters.status) {
          case 'Success':
            return launch.success === true;
          case 'Failed':
            return launch.success === false;
          case 'Upcoming':
            return launch.upcoming === true;
          default:
            return true;
        }
      });
    }

    // Filter by search term
    if (filters.searchTerm.trim()) {
      const searchTerm = filters.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(launch =>
        launch.mission.toLowerCase().includes(searchTerm) ||
        launch.rocket.toLowerCase().includes(searchTerm) ||
        launch.launchpad.toLowerCase().includes(searchTerm)
      );
    }

    setFilteredLaunches(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1); // Reset to first page when filters change
  }, [launches, filters]);

  // Get paginated data
  const getPaginatedData = useCallback(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredLaunches.slice(startIndex, endIndex);
  }, [filteredLaunches, currentPage]);

  // Load reference data on component mount
  useEffect(() => {
    loadReferenceData();
  }, [loadReferenceData]);

  // Load launches when reference data is available or date filter changes
  useEffect(() => {
    if (rockets.length > 0 && launchpads.length > 0) {
      loadLaunches();
    }
  }, [loadLaunches, rockets.length, launchpads.length]);

  // Apply filters when launches or filters change
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Event handlers
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowClick = (launch: LaunchData) => {
    setSelectedLaunch(launch);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedLaunch(null);
  };

  const currentLaunches = getPaginatedData();
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  return (
    <div className="dashboard">
      <Header title="SpaceX Launch Dashboard" />
      
      <main className="main-content">
        <div className="dashboard-container">
          <Filter 
            onFilterChange={handleFilterChange}
            currentFilter={filters}
          />
          
          <div className="results-summary">
            {!loading && (
              <p>
                Showing {currentLaunches.length} of {filteredLaunches.length} launches
                {filters.searchTerm && ` matching "${filters.searchTerm}"`}
              </p>
            )}
          </div>
          
          <Table
            launches={currentLaunches}
            onRowClick={handleRowClick}
            loading={loading}
            error={error}
          />
          
          {!loading && filteredLaunches.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              hasNextPage={hasNextPage}
              hasPrevPage={hasPrevPage}
            />
          )}
        </div>
      </main>
      
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        launch={selectedLaunch}
      />
    </div>
  );
};

export default Dashboard;
