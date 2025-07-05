import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SubheaderFilters from '../components/SubheaderFilters';
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';
import { LaunchData, FilterOptions } from '../types';
import { SpaceXApiService } from '../services/spaceXApi';

const Dashboard: React.FC = () => {
  const [launches, setLaunches] = useState<LaunchData[]>([]);
  const [filteredLaunches, setFilteredLaunches] = useState<LaunchData[]>([]);
  const [selectedLaunch, setSelectedLaunch] = useState<LaunchData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: '',
    status: '',
    searchTerm: ''
  });

  const fetchLaunches = async (page: number = 1) => {
    try {
      setLoading(true);
      setError(null);

      const options: any = {
        page,
        limit: 10
      };

      if (filters.status === 'upcoming') {
        options.upcoming = true;
      } else if (filters.status === 'success') {
        options.success = true;
      } else if (filters.status === 'failed') {
        options.success = false;
      }

      if (filters.searchTerm) {
        options.searchTerm = filters.searchTerm;
      }

      const result = await SpaceXApiService.filterLaunches(options);
      
      setLaunches(result.launches);
      setFilteredLaunches(result.launches);
      setTotalPages(result.totalPages);
      setCurrentPage(result.currentPage);
      setHasNextPage(result.hasNextPage);
      setHasPrevPage(result.hasPrevPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLaunches([]);
      setFilteredLaunches([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLaunches(1);
  }, [filters]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleRowClick = (launch: LaunchData) => {
    setSelectedLaunch(launch);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLaunch(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchLaunches(page);
  };

  if (loading && launches.length === 0) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading launches...</p>
      </div>
    );
  }

  if (error && launches.length === 0) {
    return (
      <div className="error-message">
        <p>Error: {error}</p>
        <button onClick={() => fetchLaunches(currentPage)}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Header title="SpaceX Launch Dashboard" />
      <main className="main-content">
        <div className="dashboard-container">
          <SubheaderFilters 
            onFilterChange={handleFilterChange}
            currentFilter={filters}
          />
          
          {!error && (
            <>
              <div className="results-summary">
                Showing {filteredLaunches.length} launches
                {filters.searchTerm && ` matching "${filters.searchTerm}"`}
              </div>
              
              <Table
                filteredLaunches={filteredLaunches}
                onRowClick={handleRowClick}
                loading={loading}
              />
              
              {!loading && totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  hasNextPage={hasNextPage}
                  hasPrevPage={hasPrevPage}
                />
              )}
            </>
          )}
        </div>
      </main>
      
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        launch={selectedLaunch}
      />
    </div>
  );
};

export default Dashboard;
