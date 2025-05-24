import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100';
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/components-jsx', label: 'Components & JSX' },
    { path: '/props-state', label: 'Props & State' },
    { path: '/hooks', label: 'Hooks' },
    { path: '/event-handling', label: 'Event Handling' },
    { path: '/conditional-rendering', label: 'Conditional Rendering' },
    { path: '/lists-keys', label: 'Lists & Keys' },
    { path: '/forms', label: 'Forms' },
    { path: '/context-api', label: 'Context API' },
    { path: '/react-router', label: 'React Router' },
  ];

  return (
    <nav className="bg-white shadow-md rounded-lg p-4 mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Tutorial Sections</h2>
      <ul className="space-y-1">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`block px-4 py-2 rounded-md transition-colors ${isActive(item.path)}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
