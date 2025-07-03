import React from 'react';
import { PaginationProps } from '../types';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  hasNextPage,
  hasPrevPage
}) => {
  const generatePageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than or equal to max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      
      // Always show last page
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number' && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePrevClick = () => {
    if (hasPrevPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (hasNextPage) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination-container">
      <div className="pagination">
        <button
          className={`pagination-btn prev-btn ${!hasPrevPage ? 'disabled' : ''}`}
          onClick={handlePrevClick}
          disabled={!hasPrevPage}
          aria-label="Previous page"
        >
          ←
        </button>
        
        {generatePageNumbers().map((page, index) => (
          <button
            key={index}
            className={`pagination-btn ${
              page === currentPage ? 'active' : ''
            } ${typeof page === 'string' ? 'ellipsis' : ''}`}
            onClick={() => handlePageClick(page)}
            disabled={typeof page === 'string'}
            aria-label={typeof page === 'number' ? `Page ${page}` : 'More pages'}
          >
            {page}
          </button>
        ))}
        
        <button
          className={`pagination-btn next-btn ${!hasNextPage ? 'disabled' : ''}`}
          onClick={handleNextClick}
          disabled={!hasNextPage}
          aria-label="Next page"
        >
          →
        </button>
      </div>
      
      <div className="pagination-info">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default Pagination;
