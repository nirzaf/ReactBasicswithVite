import { useState } from 'react';

interface QuizProps {
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
  topic: string;
  onComplete: (score: number) => void;
}

const Quiz = ({ questions, topic, onComplete }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      setShowResults(true);
      const score = calculateScore();
      onComplete(score);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowExplanation(false);
    }
  };

  const calculateScore = () => {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      if (selectedAnswers[i] === questions[i].correctAnswer) {
        score++;
      }
    }
    return Math.round((score / questions.length) * 100);
  };

  const isAnswered = selectedAnswers[currentQuestion] !== -1;
  const isCorrect = selectedAnswers[currentQuestion] === questions[currentQuestion].correctAnswer;

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
        <div className="text-center mb-6">
          <div className="text-5xl font-bold mb-2">{score}%</div>
          <p className="text-gray-600">
            You got {selectedAnswers.filter((answer, index) => answer === questions[index].correctAnswer).length} out of {questions.length} questions correct
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Review Your Answers:</h3>
          {questions.map((q, index) => (
            <div key={index} className="mb-4 p-3 rounded border-l-4 border-gray-300">
              <p className="font-medium">{index + 1}. {q.question}</p>
              <p className="mt-1">
                Your answer: <span className={selectedAnswers[index] === q.correctAnswer ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                  {selectedAnswers[index] !== -1 ? q.options[selectedAnswers[index]] : "Not answered"}
                </span>
              </p>
              {selectedAnswers[index] !== q.correctAnswer && (
                <p className="mt-1 text-green-600">
                  Correct answer: {q.options[q.correctAnswer]}
                </p>
              )}
              <p className="mt-2 text-gray-700 text-sm">{q.explanation}</p>
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => {
            setShowResults(false);
            setCurrentQuestion(0);
            setSelectedAnswers(Array(questions.length).fill(-1));
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{topic} Quiz</h2>
        <div className="text-sm text-gray-500">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>
      
      <div className="mb-6">
        <p className="text-lg font-medium mb-4">{questions[currentQuestion].question}</p>
        <div className="space-y-2">
          {questions[currentQuestion].options.map((option, index) => (
            <div 
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`p-3 rounded border cursor-pointer transition-colors ${
                selectedAnswers[currentQuestion] === index 
                  ? 'bg-blue-100 border-blue-500' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      </div>

      {showExplanation && (
        <div className={`p-4 rounded mb-4 ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
          <p className={`font-medium ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
            {isCorrect ? 'Correct!' : 'Incorrect!'}
          </p>
          <p className="mt-1 text-gray-700">{questions[currentQuestion].explanation}</p>
        </div>
      )}
      
      <div className="flex justify-between">
        <button 
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className={`px-4 py-2 rounded ${
            currentQuestion === 0 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Previous
        </button>
        
        {!showExplanation && isAnswered ? (
          <button 
            onClick={() => setShowExplanation(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Check Answer
          </button>
        ) : (
          <button 
            onClick={handleNext}
            disabled={!isAnswered}
            className={`px-4 py-2 rounded ${
              !isAnswered 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
