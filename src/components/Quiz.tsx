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
      <div className="border border-gray-200 rounded-lg overflow-hidden" id="quiz">
        {/* Quiz results header - Angular style */}
        <div className="bg-[#f5f5f5] border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-light text-[#1976d2]">Quiz Results</h2>
        </div>
        
        {/* Score display - Angular style */}
        <div className="px-6 py-4 bg-white">
          <div className="mb-6 flex items-center justify-center">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E6E6E6"
                  strokeWidth="3"
                  strokeDasharray="100, 100"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={score >= 70 ? '#4CAF50' : '#FF9800'}
                  strokeWidth="3"
                  strokeDasharray={`${score}, 100`}
                  className="animate-[dash_1.5s_ease-in-out_forwards]"
                />
                <text x="18" y="20.35" className="text-3xl font-medium" textAnchor="middle" fill={score >= 70 ? '#4CAF50' : '#FF9800'}>
                  {score.toFixed(0)}%
                </text>
              </svg>
            </div>
          </div>
          
          <div className="space-y-4">
            {questions.map((question, index) => {
              const isCorrect = selectedAnswers[index] === question.correctAnswer;
              return (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <div className={`px-4 py-3 ${isCorrect ? 'bg-green-50 border-l-4 border-green-500' : 'bg-red-50 border-l-4 border-red-500'}`}>
                    <p className="font-medium">{question.question}</p>
                  </div>
                  <div className="px-4 py-3 bg-white">
                    <p className="text-sm">
                      <span className="font-medium">Your answer:</span> {selectedAnswers[index] >= 0 ? question.options[selectedAnswers[index]] : 'Not answered'}
                    </p>
                    <p className="text-sm text-green-600">
                      <span className="font-medium">Correct answer:</span> {question.options[question.correctAnswer]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 flex justify-center">
            <button 
              onClick={() => {
                setShowResults(false);
                setCurrentQuestion(0);
                setSelectedAnswers(Array(questions.length).fill(-1));
              }}
              className="px-6 py-2 bg-[#1976d2] text-white rounded-md hover:bg-[#1565c0] focus:outline-none focus:ring-2 focus:ring-[#1976d2] focus:ring-offset-2 transition-colors"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden" id="quiz">
      {/* Quiz header - Angular style */}
      <div className="bg-[#f5f5f5] border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-light text-[#1976d2]">Knowledge Check</h2>
        <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full">
          Question {currentQuestion + 1} of {questions.length}
        </span>
      </div>
      
      {/* Quiz content - Angular style */}
      <div className="px-6 py-4 bg-white">
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">{questions[currentQuestion].question}</h3>
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <div 
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`p-4 border rounded-md cursor-pointer transition-colors ${
                  selectedAnswers[currentQuestion] === index 
                    ? 'border-[#1976d2] bg-[#e3f2fd] text-[#1976d2]' 
                    : 'border-gray-200 hover:border-[#1976d2] hover:bg-[#f5f5f5]'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                    selectedAnswers[currentQuestion] === index 
                      ? 'border-[#1976d2] bg-[#1976d2]' 
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswers[currentQuestion] === index && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  {option}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Navigation buttons - Angular style */}
        <div className="flex justify-between pt-4 border-t border-gray-200">
          <button 
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`px-4 py-2 rounded-md transition-colors ${
              currentQuestion === 0 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-[#1976d2] border border-[#1976d2] hover:bg-[#e3f2fd]'
            }`}
          >
            Previous
          </button>
          <button 
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === -1}
            className={`px-4 py-2 rounded-md transition-colors ${
              selectedAnswers[currentQuestion] === -1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-[#1976d2] text-white hover:bg-[#1565c0]'
            }`}
          >
            {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
