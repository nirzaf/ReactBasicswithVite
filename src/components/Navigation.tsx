import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProgressTracker from './ProgressTracker';

const Navigation: React.FC = () => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'getting-started': true,
    'components': true,
    'state-management': false,
    'advanced': false
  });
  
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Define navigation structure with sections and items
  const navSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      items: [
        { path: '/', label: 'Introduction' },
        { path: '/components-jsx', label: 'Components & JSX' }
      ]
    },
    {
      id: 'components',
      title: 'Core Concepts',
      items: [
        { path: '/props-state', label: 'Props & State' },
        { path: '/hooks', label: 'Hooks' },
        { path: '/event-handling', label: 'Event Handling' },
        { path: '/conditional-rendering', label: 'Conditional Rendering' }
      ]
    },
    {
      id: 'state-management',
      title: 'Data & State Management',
      items: [
        { path: '/lists-keys', label: 'Lists & Keys' },
        { path: '/forms', label: 'Forms' },
        { path: '/context-api', label: 'Context API' }
      ]
    },
    {
      id: 'advanced',
      title: 'Advanced Topics',
      items: [
        { path: '/react-router', label: 'React Router' }
      ]
    }
  ];

  return (
    <div className="h-full py-6 px-4">
      <div className="hidden md:block mb-8">
        <ProgressTracker />
      </div>
      
      <nav>
        {navSections.map((section) => (
          <div key={section.id} className="mb-4">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between text-left font-medium text-gray-900 py-2 border-b border-gray-200"
            >
              <span>{section.title}</span>
              <svg
                className={`w-5 h-5 transition-transform ${expandedSections[section.id] ? 'transform rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {expandedSections[section.id] && (
              <ul className="mt-1 ml-2 space-y-1">
                {section.items.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`block px-4 py-2 rounded-md text-sm ${isActive(item.path) 
                        ? 'bg-[#1976d2] text-white' 
                        : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Navigation;
