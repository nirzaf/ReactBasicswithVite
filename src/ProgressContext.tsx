import { createContext, useState } from 'react';
import type { ReactNode } from 'react';

interface ProgressContextType {
  completedTopics: string[];
  markTopicComplete: (topic: string) => void;
  isTopicCompleted: (topic: string) => boolean;
  quizScores: Record<string, number>;
  updateQuizScore: (topic: string, score: number) => void;
  getQuizScore: (topic: string) => number;
}

export const ProgressContext = createContext<ProgressContextType>({
  completedTopics: [],
  markTopicComplete: () => {},
  isTopicCompleted: () => false,
  quizScores: {},
  updateQuizScore: () => {},
  getQuizScore: () => 0,
});

interface ProgressProviderProps {
  children: ReactNode;
}

export const ProgressProvider = ({ children }: ProgressProviderProps) => {
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [quizScores, setQuizScores] = useState<Record<string, number>>({});

  const markTopicComplete = (topic: string) => {
    if (!completedTopics.includes(topic)) {
      setCompletedTopics([...completedTopics, topic]);
    }
  };

  const isTopicCompleted = (topic: string) => {
    return completedTopics.includes(topic);
  };

  const updateQuizScore = (topic: string, score: number) => {
    setQuizScores({
      ...quizScores,
      [topic]: score,
    });
  };

  const getQuizScore = (topic: string) => {
    return quizScores[topic] || 0;
  };

  return (
    <ProgressContext.Provider
      value={{
        completedTopics,
        markTopicComplete,
        isTopicCompleted,
        quizScores,
        updateQuizScore,
        getQuizScore,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};
