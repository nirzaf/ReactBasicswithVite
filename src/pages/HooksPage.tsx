import { useContext } from 'react';
import TopicHeader from '../components/TopicHeader';
import CodeEditor from '../components/CodeEditor';
import Quiz from '../components/Quiz';
import { ProgressContext } from '../ProgressContext';

const HooksPage = () => {
  const { markTopicComplete, updateQuizScore } = useContext(ProgressContext);

  const handleQuizComplete = (score: number) => {
    updateQuizScore('hooks', score);
    if (score >= 70) {
      markTopicComplete('hooks');
    }
  };

  return (
    <div>
      <TopicHeader
        title="React Hooks"
        topicId="hooks"
        description="Learn how to use React Hooks to add state and other React features to functional components."
      />

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Introduction to Hooks</h2>
          <p className="mb-4">
            Hooks are functions that let you "hook into" React state and lifecycle features from function components.
            They were introduced in React 16.8 to allow you to use state and other React features without writing a class.
          </p>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
            <h3 className="font-semibold text-yellow-800">Key Concept</h3>
            <p>
              Hooks let you organize side effects in a component by related pieces (such as adding and removing a subscription), 
              rather than forcing a split based on lifecycle methods.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">useState Hook</h2>
          <p className="mb-4">
            The useState hook lets you add React state to functional components.
          </p>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">useState Example</h3>
            <CodeEditor
              readOnly
              initialCode={`import { useState } from 'react';

const Counter = () => {
  // useState returns an array with two elements:
  // 1. The current state value
  // 2. A function to update the state
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
    </div>
  );
};`}
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">useEffect Hook</h2>
          <p className="mb-4">
            The useEffect hook lets you perform side effects in function components. It serves the same purpose as 
            componentDidMount, componentDidUpdate, and componentWillUnmount in React classes.
          </p>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">useEffect Example</h3>
            <CodeEditor
              readOnly
              initialCode={`import { useState, useEffect } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    // This code runs after every render
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);

    // This cleanup function runs before the component unmounts
    // or before the effect runs again
    return () => clearInterval(interval);
  }, []); // Empty dependency array means this effect runs once on mount

  return <div>Timer: {seconds} seconds</div>;
};`}
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Quiz</h2>
          <Quiz
            questions={[
              {
                question: "What is the main purpose of React Hooks?",
                options: [
                  "To make React faster",
                  "To allow using state and other React features in functional components",
                  "To replace Redux",
                  "To simplify CSS in React"
                ],
                correctAnswer: 1
              },
              {
                question: "Which hook is used for side effects in React?",
                options: [
                  "useState",
                  "useReducer",
                  "useEffect",
                  "useContext"
                ],
                correctAnswer: 2
              },
              {
                question: "When does useEffect with an empty dependency array run?",
                options: [
                  "Never",
                  "On every render",
                  "Only when the component mounts",
                  "Only when the component unmounts"
                ],
                correctAnswer: 2
              }
            ]}
            onComplete={handleQuizComplete}
          />
        </section>
      </div>
    </div>
  );
};

export default HooksPage;
