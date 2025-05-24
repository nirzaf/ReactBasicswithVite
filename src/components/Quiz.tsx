import React, { useState } from 'react';

type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: number;
};

type QuizProps = {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
};

const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      const score = calculateScore();
      onComplete(score);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctCount++;
      }
    });
    return (correctCount / questions.length) * 100;
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
        <p className="text-xl mb-4">Your score: {score.toFixed(0)}%</p>
        <div className="space-y-4">
          {questions.map((question, index) => {
            const isCorrect = selectedAnswers[index] === question.correctAnswer;
            return (
              <div key={index} className={`p-4 rounded-md ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                <p className="font-semibold">{question.question}</p>
                <p>Your answer: {selectedAnswers[index] >= 0 ? question.options[selectedAnswers[index]] : 'Not answered'}</p>
                <p className="text-green-600">Correct answer: {question.options[question.correctAnswer]}</p>
              </div>
            );
          })}
        </div>
        <button 
          onClick={() => {
            setShowResults(false);
            setCurrentQuestion(0);
            setSelectedAnswers(Array(questions.length).fill(-1));
          }}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4 text-sm text-gray-500">
        Question {currentQuestion + 1} of {questions.length}
      </div>
      <h3 className="text-xl font-bold mb-4">{questions[currentQuestion].question}</h3>
      <div className="space-y-3 mb-6">
        {questions[currentQuestion].options.map((option, index) => (
          <div 
            key={index}
            onClick={() => handleAnswerSelect(index)}
            className={`p-3 border rounded-md cursor-pointer hover:bg-gray-50 ${
              selectedAnswers[currentQuestion] === index ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
          >
            {option}
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <button 
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className={`px-4 py-2 rounded ${
            currentQuestion === 0 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-gray-600 text-white hover:bg-gray-700'
          }`}
        >
          Previous
        </button>
        <button 
          onClick={handleNext}
          disabled={selectedAnswers[currentQuestion] === -1}
          className={`px-4 py-2 rounded ${
            selectedAnswers[currentQuestion] === -1 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
