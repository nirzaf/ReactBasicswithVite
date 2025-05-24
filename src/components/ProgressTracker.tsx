import React, { useContext } from 'react';
import { ProgressContext } from '../ProgressContext';

const ProgressTracker: React.FC = () => {
  const { completedTopics, quizScores } = useContext(ProgressContext);
  
  const topics = [
    { id: 'components-jsx', name: 'Components & JSX' },
    { id: 'props-state', name: 'Props & State' },
    { id: 'hooks', name: 'Hooks' },
    { id: 'event-handling', name: 'Event Handling' },
    { id: 'conditional-rendering', name: 'Conditional Rendering' },
    { id: 'lists-keys', name: 'Lists & Keys' },
    { id: 'forms', name: 'Forms' },
    { id: 'context-api', name: 'Context API' },
    { id: 'react-router', name: 'React Router' }
  ];
  
  const totalTopics = topics.length;
  const completedCount = completedTopics.length;
  const progressPercentage = Math.round((completedCount / totalTopics) * 100);
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-[#f5f5f5] border-b border-gray-200 px-4 py-3">
        <h2 className="text-base font-medium text-[#1976d2]">Your Progress</h2>
      </div>
      
      <div className="p-4">
        <div className="mb-5">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">{completedCount} of {totalTopics} topics completed</span>
            <span className="text-sm font-medium text-[#1976d2]">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div 
              className="bg-[#1976d2] h-1.5 rounded-full transition-all duration-500" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="space-y-3">
          {topics.map(topic => {
            const isCompleted = completedTopics.includes(topic.id);
            const score = quizScores[topic.id] || 0;
            
            return (
              <div key={topic.id} className="flex items-center text-sm">
                <div className="flex items-center justify-center mr-3">
                  {isCompleted ? (
                    <svg className="h-5 w-5 text-[#1976d2]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className={`flex-grow ${isCompleted ? 'text-gray-900' : 'text-gray-600'}`}>{topic.name}</span>
                {score > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${score >= 70 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {score}%
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
