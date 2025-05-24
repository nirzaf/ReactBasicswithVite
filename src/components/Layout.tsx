import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navigation from './Navigation';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="text-blue-600 font-bold text-xl">React Basics Tutorial</span>
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <div className="-mr-2 flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className={`block pl-3 pr-4 py-2 border-l-4 ${location.pathname === '/' ? 'border-blue-500 text-blue-700 bg-blue-50' : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'}`}
              >
                Home
              </Link>
              <Link
                to="/components-jsx"
                className={`block pl-3 pr-4 py-2 border-l-4 ${location.pathname === '/components-jsx' ? 'border-blue-500 text-blue-700 bg-blue-50' : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'}`}
              >
                Components & JSX
              </Link>
              <Link
                to="/props-state"
                className={`block pl-3 pr-4 py-2 border-l-4 ${location.pathname === '/props-state' ? 'border-blue-500 text-blue-700 bg-blue-50' : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'}`}
              >
                Props & State
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar navigation - hidden on mobile */}
          <div className="hidden md:block md:w-64 flex-shrink-0">
            <Navigation />
          </div>
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
