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
      <div className="modal-content redesigned-modal">
        <div className="redesigned-modal-header" style={{flexDirection: 'row', alignItems: 'center', padding: '2rem 2rem 1rem 2rem', gap: '1.5rem'}}>
          <div className="modal-patch-section" style={{marginBottom: 0}}>
            {launch.links.patch && launch.links.patch.small && (
              <img src={launch.links.patch.small} alt="Mission Patch" className="modal-mission-patch" />
            )}
          </div>
          <div className="modal-title-section" style={{alignItems: 'flex-start', flex: 1, gap: '0.5rem'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
              <h2 id="modal-title" className="modal-title redesigned-modal-title" style={{margin: 0, fontSize: '1.25rem', fontWeight: 700, textAlign: 'left'}}>
                {launch.mission}
              </h2>
              <span className={`status-badge ${getStatusClass(launch.success, launch.upcoming)}`}>{getStatusText(launch.success, launch.upcoming)}</span>
            </div>
            <div className="modal-rocket-name" style={{fontSize: '0.95rem', color: '#888', marginBottom: 0}}>{launch.rocket}</div>
          </div>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
            style={{position: 'absolute', top: 18, right: 18, fontSize: '1.5rem', color: '#888', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s'}}
            onMouseOver={e => (e.currentTarget.style.color = '#222')}
            onMouseOut={e => (e.currentTarget.style.color = '#888')}
          >
            ×
          </button>
        </div>
        <div className="modal-body redesigned-modal-body">
          <div className="modal-description-section">
            {launch.details && <p className="modal-description">{launch.details}</p>}
            {launch.links.wikipedia && (
              <a href={launch.links.wikipedia} target="_blank" rel="noopener noreferrer" className="modal-wikipedia-link">
                Wikipedia
              </a>
            )}
          </div>
          <div className="modal-details-grid">
            <div className="modal-detail-row"><span className="modal-detail-label">Flight Number</span><span className="modal-detail-value">{launch.number}</span></div>
            <div className="modal-detail-row"><span className="modal-detail-label">Mission Name</span><span className="modal-detail-value">{launch.mission}</span></div>
            <div className="modal-detail-row"><span className="modal-detail-label">Rocket Type</span><span className="modal-detail-value">{launch.rocketType || '-'}</span></div>
            <div className="modal-detail-row"><span className="modal-detail-label">Rocket Name</span><span className="modal-detail-value">{launch.rocket}</span></div>
            <div className="modal-detail-row"><span className="modal-detail-label">Manufacturer</span><span className="modal-detail-value">{launch.manufacturer || 'SpaceX'}</span></div>
            <div className="modal-detail-row"><span className="modal-detail-label">Nationality</span><span className="modal-detail-value">{launch.nationality || 'SpaceX'}</span></div>
            <div className="modal-detail-row"><span className="modal-detail-label">Launch Date</span><span className="modal-detail-value">{formatDate(launch.date)}</span></div>
            <div className="modal-detail-row"><span className="modal-detail-label">Payload Type</span><span className="modal-detail-value">{launch.payloadType || '-'}</span></div>
            <div className="modal-detail-row"><span className="modal-detail-label">Orbit</span><span className="modal-detail-value">{launch.orbit || '-'}</span></div>
            <div className="modal-detail-row"><span className="modal-detail-label">Launch Site</span><span className="modal-detail-value">{launch.launchpad}</span></div>
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
