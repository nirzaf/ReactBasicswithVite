import { useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navigation from './Navigation';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top navigation bar - Angular style */}
      <header className="bg-[#1976d2] text-white shadow-md z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo and title */}
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
                <span className="font-bold text-xl tracking-tight">React Basics</span>
              </Link>
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className={`py-2 hover:text-gray-200 ${location.pathname === '/' ? 'border-b-2 border-white' : ''}`}>Home</Link>
              <Link to="/components-jsx" className={`py-2 hover:text-gray-200 ${location.pathname === '/components-jsx' ? 'border-b-2 border-white' : ''}`}>Docs</Link>
              <Link to="/props-state" className={`py-2 hover:text-gray-200 ${location.pathname === '/props-state' ? 'border-b-2 border-white' : ''}`}>Tutorial</Link>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-[#3f51b5] text-white placeholder-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg className="absolute right-2 top-1.5 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <a href="https://github.com/yourusername/react-basics-tutorial" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200 hover:bg-[#3f51b5] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#1976d2] pb-3 px-4">
            <div className="pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className={`block px-3 py-2 rounded-md ${location.pathname === '/' ? 'bg-[#3f51b5] text-white' : 'text-white hover:bg-[#3f51b5]'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/components-jsx"
                className={`block px-3 py-2 rounded-md ${location.pathname === '/components-jsx' ? 'bg-[#3f51b5] text-white' : 'text-white hover:bg-[#3f51b5]'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Docs
              </Link>
              <Link
                to="/props-state"
                className={`block px-3 py-2 rounded-md ${location.pathname === '/props-state' ? 'bg-[#3f51b5] text-white' : 'text-white hover:bg-[#3f51b5]'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tutorial
              </Link>
              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-[#3f51b5] text-white placeholder-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main content with sidebar - Angular style */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar navigation - Angular style */}
        <div className="hidden md:block w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto">
          <Navigation />
        </div>

        {/* Main content area - Angular style */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
