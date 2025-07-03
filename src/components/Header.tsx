import React from 'react';
import { HeaderProps } from '../types';

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/d/de/SpaceX-Logo.svg" 
            alt="SpaceX Logo" 
            className="spacex-logo"
          />
          <h1 className="header-title">{title}</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
