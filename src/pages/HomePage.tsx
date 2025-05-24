import { useContext } from 'react';
import CodeEditor from '../components/CodeEditor';
import { ProgressContext } from '../context/ProgressContext';

const HomePage = () => {
  const { markTopicComplete } = useContext(ProgressContext);

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-6">React Basics Tutorial</h1>
      <p className="text-xl text-gray-600 mb-8">
        Welcome to the React Basics Tutorial! This interactive web app will guide you through the fundamentals of React, 
        a popular JavaScript library for building user interfaces.
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">How to Use This Tutorial</h2>
        <p className="mb-2">
          This tutorial is designed to be followed sequentially, but you can jump to any topic you're interested in.
          Each section includes:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Step-by-step explanations</li>
          <li>Interactive code examples you can edit</li>
          <li>Practical exercises</li>
          <li>Quizzes to test your understanding</li>
        </ul>
        <p className="mt-2">
          Your progress will be tracked as you complete each section and quiz.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-600">
          <h3 className="text-xl font-bold mb-2">What You'll Learn</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Components and JSX - The building blocks of React</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Props and State - Managing data in React</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Hooks - Functional component features</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Event Handling - Responding to user interactions</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Conditional Rendering - Dynamic UI based on conditions</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Lists and Keys - Rendering collections efficiently</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Forms - Handling user input</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Context API - Managing global state</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>React Router - Navigation in React applications</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-600">
          <h3 className="text-xl font-bold mb-2">Prerequisites</h3>
          <p className="mb-4">
            To get the most out of this tutorial, you should have:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span>Basic understanding of HTML, CSS, and JavaScript</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span>Familiarity with ES6+ features (arrow functions, destructuring, etc.)</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span>A code editor (VS Code recommended)</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span>Node.js installed (version 18.0.0 or higher)</span>
            </li>
          </ul>
          <p className="mt-4">
            Don't worry if you're not familiar with TypeScript - we'll explain the TypeScript-specific concepts as we go.
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-bold mb-4">Getting Started with React 19 + Vite + TypeScript</h3>
        <p className="mb-4">
          Before diving into React concepts, let's understand how to set up a React project with Vite and TypeScript.
          Vite is a modern build tool that offers a faster and leaner development experience compared to traditional bundlers.
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-2">Creating a New Project</h4>
        <CodeEditor
          readOnly
          initialCode={`# Create a new React + TypeScript project with Vite
npm create vite@latest my-react-app -- --template react-ts

# Navigate to the project directory
cd my-react-app

# Install dependencies
npm install

# Start the development server
npm run dev`}
          language="bash"
        />

        <h4 className="text-lg font-semibold mt-6 mb-2">Project Structure</h4>
        <p className="mb-4">
          After creating a new project, you'll have a directory structure similar to this:
        </p>
        <CodeEditor
          readOnly
          initialCode={`my-react-app/
├── node_modules/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts`}
          language="bash"
        />

        <h4 className="text-lg font-semibold mt-6 mb-2">Key Files Explained</h4>
        <ul className="space-y-3">
          <li>
            <strong>src/main.tsx</strong>: The entry point of your application
          </li>
          <li>
            <strong>src/App.tsx</strong>: The main component that gets rendered
          </li>
          <li>
            <strong>index.html</strong>: The HTML template for your app
          </li>
          <li>
            <strong>vite.config.ts</strong>: Configuration for Vite
          </li>
          <li>
            <strong>tsconfig.json</strong>: TypeScript configuration
          </li>
        </ul>

        <div className="mt-8">
          <button
            onClick={() => markTopicComplete('home')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Mark as Completed
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Ready to Start?</h3>
        <p className="mb-4">
          Begin your React journey by clicking on "Components & JSX" in the sidebar to learn about the fundamental building blocks of React applications.
        </p>
        <p>
          Each topic builds on the previous ones, so it's recommended to follow them in order. However, feel free to jump to any topic you're particularly interested in.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
