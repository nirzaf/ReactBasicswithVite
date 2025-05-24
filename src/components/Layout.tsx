import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-blue-700' : 'hover:bg-blue-600';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white shadow-lg">
        <div className="p-4 font-bold text-xl">
          <Link to="/">React Basics</Link>
        </div>
        <nav className="mt-6">
          <ul>
            <li>
              <Link 
                to="/" 
                className={`flex items-center px-4 py-3 ${isActive('/')}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/components-jsx" 
                className={`flex items-center px-4 py-3 ${isActive('/components-jsx')}`}
              >
                Components & JSX
              </Link>
            </li>
            <li>
              <Link 
                to="/props-state" 
                className={`flex items-center px-4 py-3 ${isActive('/props-state')}`}
              >
                Props & State
              </Link>
            </li>
            <li>
              <Link 
                to="/hooks" 
                className={`flex items-center px-4 py-3 ${isActive('/hooks')}`}
              >
                Hooks
              </Link>
            </li>
            <li>
              <Link 
                to="/event-handling" 
                className={`flex items-center px-4 py-3 ${isActive('/event-handling')}`}
              >
                Event Handling
              </Link>
            </li>
            <li>
              <Link 
                to="/conditional-rendering" 
                className={`flex items-center px-4 py-3 ${isActive('/conditional-rendering')}`}
              >
                Conditional Rendering
              </Link>
            </li>
            <li>
              <Link 
                to="/lists-keys" 
                className={`flex items-center px-4 py-3 ${isActive('/lists-keys')}`}
              >
                Lists & Keys
              </Link>
            </li>
            <li>
              <Link 
                to="/forms" 
                className={`flex items-center px-4 py-3 ${isActive('/forms')}`}
              >
                Forms
              </Link>
            </li>
            <li>
              <Link 
                to="/context-api" 
                className={`flex items-center px-4 py-3 ${isActive('/context-api')}`}
              >
                Context API
              </Link>
            </li>
            <li>
              <Link 
                to="/react-router" 
                className={`flex items-center px-4 py-3 ${isActive('/react-router')}`}
              >
                React Router
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
