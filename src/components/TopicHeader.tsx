import React from 'react';
import { Link } from 'react-router-dom';

type TopicHeaderProps = {
  title: string;
  topicId: string;
  description: string;
};

const TopicHeader: React.FC<TopicHeaderProps> = ({ title, topicId, description }) => {
  return (
    <div className="mb-10">
      {/* Breadcrumb navigation - Angular style */}
      <nav className="text-sm mb-6">
        <ol className="flex items-center space-x-2">
          <li>
            <Link to="/" className="text-[#1976d2] hover:underline">Home</Link>
          </li>
          <li className="flex items-center">
            <svg className="h-4 w-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-600">{title}</span>
          </li>
        </ol>
      </nav>
      
      {/* Title and description - Angular style */}
      <h1 className="text-4xl font-light text-[#1976d2] mb-4">{title}</h1>
      <div className="bg-[#f5f5f5] border-l-4 border-[#1976d2] pl-4 py-3 pr-3 text-gray-700">
        <p>{description}</p>
      </div>
      
      {/* Quick links - Angular style */}
      <div className="mt-6 flex flex-wrap gap-2">
        <a href="#examples" className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#e3f2fd] text-[#1976d2] hover:bg-[#bbdefb]">
          <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Examples
        </a>
        <a href="#quiz" className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#e3f2fd] text-[#1976d2] hover:bg-[#bbdefb]">
          <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Quiz
        </a>
      </div>
    </div>
  );
};

export default TopicHeader;
