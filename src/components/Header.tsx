import React from 'react';
import { HeaderProps } from '../types';

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="header">
      <div className="header-container centered-header">
        {/* Optional: Avatar/notification badge section */}
        {/* <div className="header-avatar-section">
          <div className="avatar-badge">
            <img src="/avatar.png" alt="User Avatar" className="avatar-img" />
            <span className="badge">4</span>
          </div>
        </div> */}
        <div className="logo-section centered-logo">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/d/de/SpaceX-Logo.svg" 
            alt="SpaceX Logo" 
            className="spacex-logo"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
