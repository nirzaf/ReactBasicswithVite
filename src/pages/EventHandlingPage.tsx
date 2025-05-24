import { useContext } from 'react';
import TopicHeader from '../components/TopicHeader';
import CodeEditor from '../components/CodeEditor';
import Quiz from '../components/Quiz';
import { ProgressContext } from '../ProgressContext';

const EventHandlingPage = () => {
  const { markTopicComplete, updateQuizScore } = useContext(ProgressContext);

  const handleQuizComplete = (score: number) => {
    updateQuizScore('event-handling', score);
    if (score >= 70) {
      markTopicComplete('event-handling');
    }
  };

  return (
    <div>
      <TopicHeader
        title="Event Handling in React"
        topicId="event-handling"
        description="Learn how to handle user interactions and events in React applications."
      />

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Introduction to React Events</h2>
          <p className="mb-4">
            React has a synthetic event system that normalizes events across different browsers.
            Event names in React use camelCase (e.g., onClick instead of onclick) and you pass a function as the event handler.
          </p>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
            <h3 className="font-semibold text-yellow-800">Key Concept</h3>
            <p>
              React events are synthetic wrappers around native browser events, providing consistent behavior across browsers.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Basic Event Handling</h2>
          <p className="mb-4">
            In React, you define event handlers as methods on your component or as inline functions.
          </p>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Basic Event Handling Example</h3>
            <CodeEditor
              readOnly
              initialCode={`import { useState } from 'react';

const ClickCounter = () => {
  const [count, setCount] = useState<number>(0);

  // Method as event handler
  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      
      {/* Using the method as event handler */}
      <button onClick={handleClick}>
        Click me (method)
      </button>
      
      {/* Using an inline function */}
      <button onClick={() => setCount(count + 1)}>
        Click me (inline)
      </button>
    </div>
  );
};`}
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Event Object</h2>
          <p className="mb-4">
            React event handlers receive a synthetic event object that contains information about the event.
          </p>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Using the Event Object</h3>
            <CodeEditor
              readOnly
              initialCode={`import { useState } from 'react';

const Form = () => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Access the input value from the event object
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent the default form submission behavior
    event.preventDefault();
    alert(\`Submitted: \${inputValue}\`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={inputValue} 
        onChange={handleChange} 
        placeholder="Type something"
      />
      <button type="submit">Submit</button>
    </form>
  );
};`}
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Quiz</h2>
          <Quiz
            questions={[
              {
                question: "How are event names written in React?",
                options: [
                  "lowercase (onclick)",
                  "UPPERCASE (ONCLICK)",
                  "camelCase (onClick)",
                  "snake_case (on_click)"
                ],
                correctAnswer: 2
              },
              {
                question: "What does event.preventDefault() do?",
                options: [
                  "Stops the event from bubbling up",
                  "Prevents the default browser behavior for that event",
                  "Removes all event listeners",
                  "Cancels the React component rendering"
                ],
                correctAnswer: 1
              },
              {
                question: "What is the correct way to pass parameters to an event handler?",
                options: [
                  "onClick={handleClick(param)}",
                  "onClick={handleClick, param}",
                  "onClick={handleClick.bind(this, param)}",
                  "onClick={() => handleClick(param)}"
                ],
                correctAnswer: 3
              }
            ]}
            onComplete={handleQuizComplete}
          />
        </section>
      </div>
    </div>
  );
};

export default EventHandlingPage;
