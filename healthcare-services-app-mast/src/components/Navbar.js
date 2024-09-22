import React, { useState } from 'react';
import './Navbar.css';

function Navbar({ setCurrentView, setSearchTerm }) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Healthcare Services</div>
      <div className="navbar-menu">
        <button onClick={() => setCurrentView('dashboard')}>Dashboard</button>
        <button onClick={() => setCurrentView('services')}>Services</button>
        <button onClick={() => setCurrentView('form')}>Add New</button>
        <button onClick={toggleSearch} className="search-toggle">
          {isSearchVisible ? 'Close' : 'Search'}
        </button>
      </div>
      {isSearchVisible && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search services..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
    </nav>
  );
}

export default Navbar;