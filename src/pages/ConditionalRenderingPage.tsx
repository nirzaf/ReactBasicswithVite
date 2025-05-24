import { useContext } from 'react';
import TopicHeader from '../components/TopicHeader';
import CodeEditor from '../components/CodeEditor';
import Quiz from '../components/Quiz';
import { ProgressContext } from '../ProgressContext';

const ConditionalRenderingPage = () => {
  const { markTopicComplete, updateQuizScore } = useContext(ProgressContext);

  const handleQuizComplete = (score: number) => {
    updateQuizScore('conditional-rendering', score);
    if (score >= 70) {
      markTopicComplete('conditional-rendering');
    }
  };

  return (
    <div>
      <TopicHeader
        title="Conditional Rendering"
        topicId="conditional-rendering"
        description="Learn how to render different UI elements based on conditions in React."
      />

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Introduction to Conditional Rendering</h2>
          <p className="mb-4">
            Conditional rendering in React works the same way as conditions in JavaScript. 
            You can use JavaScript operators like if, &&, and the ternary operator to create elements 
            representing the current state, and React will update the UI accordingly.
          </p>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
            <h3 className="font-semibold text-yellow-800">Key Concept</h3>
            <p>
              Conditional rendering allows you to create distinct components that encapsulate the behavior you need, 
              then render only some of them depending on the state of your application.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Using If Statements</h2>
          <p className="mb-4">
            You can use regular JavaScript if statements to decide what to render.
          </p>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">If Statement Example</h3>
            <CodeEditor
              readOnly
              initialCode={`import { useState } from 'react';

const LoginControl = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Helper function that returns different elements based on login state
  const renderButton = () => {
    if (isLoggedIn) {
      return <button onClick={() => setIsLoggedIn(false)}>Logout</button>;
    } else {
      return <button onClick={() => setIsLoggedIn(true)}>Login</button>;
    }
  };

  return (
    <div>
      <p>The user is {isLoggedIn ? 'logged in' : 'logged out'}.</p>
      {renderButton()}
    </div>
  );
};`}
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Inline Conditional Rendering with &&</h2>
          <p className="mb-4">
            You can embed expressions in JSX by wrapping them in curly braces. This includes the JavaScript logical && operator.
          </p>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Logical && Operator Example</h3>
            <CodeEditor
              readOnly
              initialCode={`import { useState } from 'react';

const Notifications = () => {
  const [unreadMessages, setUnreadMessages] = useState<string[]>([
    'Hello from Alice',
    'Meeting reminder'
  ]);

  return (
    <div>
      <h2>Inbox</h2>
      
      {/* The expression after && will only be rendered if the condition is true */}
      {unreadMessages.length > 0 && (
        <p>You have {unreadMessages.length} unread messages.</p>
      )}
      
      <button onClick={() => setUnreadMessages([])}>
        Mark all as read
      </button>
    </div>
  );
};`}
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Conditional Rendering with Ternary Operator</h2>
          <p className="mb-4">
            Another method for conditionally rendering elements inline is to use the JavaScript ternary operator.
          </p>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Ternary Operator Example</h3>
            <CodeEditor
              readOnly
              initialCode={`import { useState } from 'react';

const ToggleContent = () => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  return (
    <div>
      <h2>Product Information</h2>
      
      {/* Ternary operator: condition ? true : false */}
      {showDetails ? (
        <div>
          <p>Detailed product information goes here...</p>
          <button onClick={() => setShowDetails(false)}>
            Hide Details
          </button>
        </div>
      ) : (
        <button onClick={() => setShowDetails(true)}>
          Show Details
        </button>
      )}
    </div>
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
                question: "Which operator can be used for inline conditional rendering in React?",
                options: [
                  "switch",
                  "if-else",
                  "&&",
                  "||="
                ],
                correctAnswer: 2
              },
              {
                question: "What happens when you use the && operator for conditional rendering and the condition is false?",
                options: [
                  "It renders false",
                  "It renders null",
                  "It renders nothing",
                  "It throws an error"
                ],
                correctAnswer: 2
              },
              {
                question: "Which is the correct syntax for a ternary operator in JSX?",
                options: [
                  "{if(condition) ? <Component1/> : <Component2/>}",
                  "{condition ? <Component1/> : <Component2/>}",
                  "{condition && <Component1/> || <Component2/>}",
                  "{condition : <Component1/> ? <Component2/>}"
                ],
                correctAnswer: 1
              }
            ]}
            onComplete={handleQuizComplete}
          />
        </section>
      </div>
    </div>
  );
};

export default ConditionalRenderingPage;
