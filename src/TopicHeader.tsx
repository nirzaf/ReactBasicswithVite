import { useContext } from 'react';
import { ProgressContext } from '../context/ProgressContext';

interface TopicHeaderProps {
  title: string;
  topicId: string;
  description: string;
}

const TopicHeader = ({ title, topicId, description }: TopicHeaderProps) => {
  const { isTopicCompleted, getQuizScore } = useContext(ProgressContext);
  const completed = isTopicCompleted(topicId);
  const quizScore = getQuizScore(topicId);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
        <div className="flex items-center">
          {completed && (
            <div className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full flex items-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Completed
            </div>
          )}
          {quizScore > 0 && (
            <div className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              Quiz: {quizScore}%
            </div>
          )}
        </div>
      </div>
      <p className="mt-2 text-gray-600">{description}</p>
      <div className="mt-4 border-b border-gray-200"></div>
    </div>
  );
};

export default TopicHeader;
