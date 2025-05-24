import { useContext } from 'react';
import TopicHeader from '../components/TopicHeader';
import CodeEditor from '../components/CodeEditor';
import Quiz from '../components/Quiz';
import { ProgressContext } from '../ProgressContext';

const ComponentsJSXPage = () => {
  const { markTopicComplete, updateQuizScore } = useContext(ProgressContext);

  const handleQuizComplete = (score: number) => {
    updateQuizScore('components-jsx', score);
    if (score >= 70) {
      markTopicComplete('components-jsx');
    }
  };

  return (
    <div>
      <TopicHeader
        title="Components and JSX"
        topicId="components-jsx"
        description="Learn about the building blocks of React applications and the syntax that powers them."
      />

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">What are React Components?</h2>
          <p className="mb-4">
            Components are the core building blocks of React applications. A component is a self-contained, 
            reusable piece of code that returns a React element describing what should appear on the screen.
          </p>
          <p className="mb-4">
            Think of components as custom HTML elements that you can define once and reuse throughout your application.
            Components can be as simple as a button or as complex as an entire page.
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
            <h3 className="font-semibold text-yellow-800">Key Concept</h3>
            <p>
              Components let you split the UI into independent, reusable pieces, and think about each piece in isolation.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Types of Components</h2>
          <p className="mb-4">
            In React, there are two primary ways to define components:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-5 rounded-lg shadow border-t-4 border-blue-500">
              <h3 className="text-xl font-semibold mb-3">Function Components</h3>
              <p className="mb-3">
                The simplest way to define a component is to write a JavaScript function that returns JSX.
              </p>
              <CodeEditor
                readOnly
                initialCode={`function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// With TypeScript and arrow function syntax
const Welcome: React.FC<{ name: string }> = ({ name }) => {
  return <h1>Hello, {name}</h1>;
};`}
              />
            </div>

            <div className="bg-white p-5 rounded-lg shadow border-t-4 border-purple-500">
              <h3 className="text-xl font-semibold mb-3">Class Components</h3>
              <p className="mb-3">
                You can also define components using ES6 classes. While still supported, class components are less common in modern React.
              </p>
              <CodeEditor
                readOnly
                initialCode={`class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

// With TypeScript
class Welcome extends React.Component<{ name: string }> {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}`}
              />
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
            <h3 className="font-semibold text-blue-800">Modern React Preference</h3>
            <p>
              In modern React (especially with React 19), function components are preferred over class components 
              due to their simplicity and the introduction of Hooks, which we'll cover in a later section.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">What is JSX?</h2>
          <p className="mb-4">
            JSX (JavaScript XML) is a syntax extension for JavaScript that looks similar to HTML. 
            It allows you to write HTML-like code in your JavaScript files, making it easier to visualize 
            the UI you're building.
          </p>

          <CodeEditor
            readOnly
            initialCode={`// This is JSX
const element = <h1>Hello, world!</h1>;

// It compiles to this JavaScript
const element = React.createElement('h1', null, 'Hello, world!');`}
          />

          <p className="mt-4 mb-4">
            JSX is not required for React, but it makes the code more readable and writing components more intuitive.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">JSX Rules</h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>JSX elements must have a closing tag (<code>&lt;img /&gt;</code> instead of <code>&lt;img&gt;</code>)</li>
            <li>Components must return a single root element (or use fragments: <code>&lt;&gt;...&lt;/&gt;</code>)</li>
            <li>JSX attributes use camelCase naming (e.g., <code>className</code> instead of <code>class</code>)</li>
            <li>JavaScript expressions can be included in JSX using curly braces <code>{'{}'}</code></li>
          </ul>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">JSX Examples</h3>
            <CodeEditor
              readOnly
              initialCode={`// Using JavaScript expressions in JSX
const name = 'John';
const element = <h1>Hello, {name}!</h1>;

// Using JSX with attributes
const element = <img src={user.avatarUrl} alt={user.name} />;

// Using JSX with children
const element = (
  <div>
    <h1>Hello!</h1>
    <p>Good to see you here.</p>
  </div>
);

// Using fragments to return multiple elements
const element = (
  <>
    <h1>Title</h1>
    <p>Paragraph</p>
  </>
);`}
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Components in TypeScript</h2>
          <p className="mb-4">
            TypeScript adds static type checking to your components, making your code more robust and providing better IDE support.
          </p>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Defining Component Props</h3>
            <CodeEditor
              readOnly
              initialCode={`// Define a type for the component props
type ButtonProps = {
  text: string;
  onClick: () => void;
  color?: 'primary' | 'secondary' | 'danger';  // Optional prop with specific values
};

// Use the type in your component
const Button = ({ text, onClick, color = 'primary' }: ButtonProps) => {
  return (
    <button 
      onClick={onClick}
      className={\`btn btn-\${color}\`}
    >
      {text}
    </button>
  );
};

// Usage
<Button 
  text="Click me" 
  onClick={() => console.log('Button clicked')} 
  color="primary" 
/>`}
            />
          </div>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">React.FC vs. Function Declaration</h3>
            <p className="mb-3">
              There are two common ways to type function components in TypeScript:
            </p>
            <CodeEditor
              readOnly
              initialCode={`// Using React.FC (Function Component)
// Automatically includes children prop and other React properties
const Greeting: React.FC<{ name: string }> = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};

// Using a regular function with explicit return type
// More explicit about what the component returns
const Greeting = ({ name }: { name: string }): JSX.Element => {
  return <h1>Hello, {name}!</h1>;
};`}
            />
            <p className="mt-3">
              Both approaches work, but many developers prefer the second approach for its explicitness.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Composing Components</h2>
          <p className="mb-4">
            Components can refer to other components in their output. This lets us use the same component abstraction 
            for any level of detail, from small buttons to entire pages.
          </p>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Component Composition Example</h3>
            <CodeEditor
              readOnly
              initialCode={`// Button component
const Button = ({ text, onClick }: { text: string; onClick: () => void }) => {
  return (
    <button 
      onClick={onClick}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      {text}
    </button>
  );
};

// Card component that uses Button
const Card = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="border rounded-lg p-4 shadow">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="my-2">{description}</p>
      <Button 
        text="Learn More" 
        onClick={() => console.log('Button in Card clicked')} 
      />
    </div>
  );
};

// App component that uses multiple Cards
const App = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card 
        title="First Card" 
        description="This is the first card description" 
      />
      <Card 
        title="Second Card" 
        description="This is the second card description" 
      />
    </div>
  );
};`}
            />
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
            <h3 className="font-semibold text-yellow-800">Best Practice</h3>
            <p>
              Extract components when they become too complex or when parts of the UI are used in multiple places.
              This improves readability, maintainability, and reusability of your code.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Interactive Exercise</h2>
          <p className="mb-4">
            Try creating a simple Profile component that displays a user's name, job title, and a brief bio.
            Edit the code below:
          </p>

          <CodeEditor
            initialCode={`// Create a Profile component that displays user information
// It should accept name, jobTitle, and bio as props

type ProfileProps = {
  name: string;
  jobTitle: string;
  bio: string;
};

const Profile = ({ name, jobTitle, bio }: ProfileProps) => {
  return (
    <div className="border rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="text-gray-600 mb-4">{jobTitle}</p>
      <p>{bio}</p>
    </div>
  );
};

// Usage example (this part is just for reference)
const App = () => {
  return (
    <Profile
      name="Jane Doe"
      jobTitle="Frontend Developer"
      bio="I love building user interfaces with React and TypeScript."
    />
  );
};`}
          />

          <div className="mt-6 mb-8">
            <p className="italic text-gray-600 mb-2">
              Note: This is a sandbox environment. In a real application, you would see the rendered component.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Quiz: Components and JSX</h2>
          <Quiz
            topic="Components and JSX"
            questions={[
              {
                question: "What is a React component?",
                options: [
                  "A JavaScript function that returns HTML",
                  "A reusable piece of code that returns a React element",
                  "A CSS class that styles HTML elements",
                  "A type of database for React applications"
                ],
                correctAnswer: 1,
                explanation: "A React component is a reusable piece of code that returns a React element describing what should appear on the screen."
              },
              {
                question: "Which of the following is NOT a valid way to define a React component?",
                options: [
                  "Function declaration",
                  "Arrow function",
                  "ES6 class extending React.Component",
                  "HTML tag with React attributes"
                ],
                correctAnswer: 3,
                explanation: "React components can be defined using function declarations, arrow functions, or ES6 classes extending React.Component. HTML tags with React attributes is not a valid way to define a component."
              },
              {
                question: "What is JSX?",
                options: [
                  "A JavaScript library for building user interfaces",
                  "A syntax extension for JavaScript that looks similar to HTML",
                  "A package manager for React applications",
                  "A testing framework for React components"
                ],
                correctAnswer: 1,
                explanation: "JSX (JavaScript XML) is a syntax extension for JavaScript that looks similar to HTML, allowing you to write HTML-like code in your JavaScript files."
              },
              {
                question: "In JSX, how do you include JavaScript expressions?",
                options: [
                  "Using double quotes: \"expression\"",
                  "Using single quotes: 'expression'",
                  "Using curly braces: {expression}",
                  "Using parentheses: (expression)"
                ],
                correctAnswer: 2,
                explanation: "In JSX, JavaScript expressions are included using curly braces: {expression}."
              },
              {
                question: "Which of the following is a rule in JSX?",
                options: [
                  "Components can return multiple root elements without a wrapper",
                  "HTML attributes use the same names as in HTML (e.g., 'class' instead of 'className')",
                  "Self-closing tags must include a forward slash (e.g., <img />)",
                  "All JSX elements must be lowercase"
                ],
                correctAnswer: 2,
                explanation: "In JSX, self-closing tags must include a forward slash (e.g., <img />). Components must return a single root element (or use fragments), attributes use camelCase naming (e.g., className instead of class), and component names can be uppercase or lowercase depending on whether they're custom components or HTML elements."
              }
            ]}
            onComplete={handleQuizComplete}
          />
        </section>

        <div className="mt-8">
          <button
            onClick={() => markTopicComplete('components-jsx')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Mark as Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComponentsJSXPage;
