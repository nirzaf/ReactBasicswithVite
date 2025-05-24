import React from 'react';

type TopicHeaderProps = {
  title: string;
  topicId: string;
  description: string;
};

const TopicHeader: React.FC<TopicHeaderProps> = ({ title, topicId, description }) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
      <p className="text-lg text-gray-600">{description}</p>
    </div>
  );
};

export default TopicHeader;
