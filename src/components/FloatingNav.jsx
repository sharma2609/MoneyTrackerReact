import React from 'react';

/**
 * Floating vertical navigation bar
 * Fixed on the far right edge, mid-screen aligned
 */
const FloatingNav = ({ currentView, onNavigate }) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: '◉' },
    { id: 'analysis', label: 'Analysis', icon: '◐' },
    { id: 'reports', label: 'Reports', icon: '⬇' },
    { id: 'settings', label: 'Settings', icon: '⚙' }
  ];

  return (
    <nav className="floating-nav">
      {navItems.map(item => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`nav-item ${currentView === item.id ? 'active' : ''}`}
          title={item.label}
          aria-label={item.label}
        >
          <span className="nav-icon">{item.icon}</span>
        </button>
      ))}
    </nav>
  );
};

export default FloatingNav;
