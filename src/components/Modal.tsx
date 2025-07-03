import React from 'react';
import { ModalProps } from '../types';

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, launch }) => {
  if (!isOpen || !launch) {
    return null;
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  const getStatusText = (success: boolean | null, upcoming: boolean): string => {
    if (upcoming) return 'Upcoming';
    if (success === true) return 'Success';
    if (success === false) return 'Failed';
    return 'Unknown';
  };

  const getStatusClass = (success: boolean | null, upcoming: boolean): string => {
    if (upcoming) return 'status-upcoming';
    if (success === true) return 'status-success';
    if (success === false) return 'status-failed';
    return 'status-unknown';
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div 
      className="modal-backdrop" 
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">
            {launch.mission}
          </h2>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        
        <div className="modal-body">
          <div className="launch-details">
            <div className="detail-row">
              <span className="detail-label">Flight Number:</span>
              <span className="detail-value">{launch.number}</span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Launch Date:</span>
              <span className="detail-value">{formatDate(launch.date)}</span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Rocket:</span>
              <span className="detail-value">{launch.rocket}</span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Launch Site:</span>
              <span className="detail-value">{launch.launchpad}</span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Status:</span>
              <span className={`detail-value status-badge ${getStatusClass(launch.success, launch.upcoming)}`}>
                {getStatusText(launch.success, launch.upcoming)}
              </span>
            </div>
            
            {launch.details && (
              <div className="detail-row details-section">
                <span className="detail-label">Mission Details:</span>
                <p className="detail-value mission-description">
                  {launch.details}
                </p>
              </div>
            )}
            
            {launch.cores && launch.cores.length > 0 && (
              <div className="detail-row">
                <span className="detail-label">Core Information:</span>
                <div className="cores-info">
                  {launch.cores.map((core, index) => (
                    <div key={index} className="core-detail">
                      <span>Core #{index + 1}: </span>
                      <span>
                        {core.reused ? 'Reused' : 'New'} | 
                        Landing: {core.landing_success ? 'Success' : core.landing_attempt ? 'Failed' : 'Not attempted'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {launch.links.webcast && (
              <div className="detail-row">
                <span className="detail-label">Webcast:</span>
                <a 
                  href={launch.links.webcast} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="detail-link"
                >
                  Watch on YouTube
                </a>
              </div>
            )}
            
            {launch.links.article && (
              <div className="detail-row">
                <span className="detail-label">Article:</span>
                <a 
                  href={launch.links.article} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="detail-link"
                >
                  Read More
                </a>
              </div>
            )}
            
            {launch.links.wikipedia && (
              <div className="detail-row">
                <span className="detail-label">Wikipedia:</span>
                <a 
                  href={launch.links.wikipedia} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="detail-link"
                >
                  Wikipedia Page
                </a>
              </div>
            )}
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="modal-btn secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
