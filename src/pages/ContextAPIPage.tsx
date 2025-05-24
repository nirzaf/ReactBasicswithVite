import { useContext } from 'react';
import TopicHeader from '../components/TopicHeader';
import CodeEditor from '../components/CodeEditor';
import Quiz from '../components/Quiz';
import { ProgressContext } from '../ProgressContext';

const ContextAPIPage = () => {
  const { markTopicComplete, updateQuizScore } = useContext(ProgressContext);

  const handleQuizComplete = (score: number) => {
    updateQuizScore('context-api', score);
    if (score >= 70) {
      markTopicComplete('context-api');
    }
  };

  return (
    <div>
      <TopicHeader
        title="Context API"
        topicId="context-api"
        description="Learn how to use React's Context API to share state across components without prop drilling."
      />

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">What is Context API?</h2>
          <p className="mb-4">
            Context provides a way to pass data through the component tree without having to pass props down manually at every level.
            It's designed to share data that can be considered "global" for a tree of React components, such as the current authenticated user,
            theme, or preferred language.
          </p>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
            <h3 className="font-semibold text-yellow-800">Key Concept</h3>
            <p>
              Context solves the problem of "prop drilling" - passing props through intermediate components that don't need the data but only pass it down.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Creating and Using Context</h2>
          <p className="mb-4">
            Here's how to create and use Context in React:
          </p>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Basic Context Example</h3>
            <CodeEditor
              readOnly
              initialCode={`import React, { createContext, useContext, useState } from 'react';

// Step 1: Create a Context
const ThemeContext = createContext<{
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}>({
  theme: 'light',
  toggleTheme: () => {}
});

// Step 2: Create a Provider Component
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Step 3: Create a Custom Hook for Using the Context
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Step 4: Use the Context in Components
const ThemedButton = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      style={{
        backgroundColor: theme === 'light' ? '#f8f9fa' : '#343a40',
        color: theme === 'light' ? '#343a40' : '#f8f9fa',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    >
      Toggle Theme (Current: {theme})
    </button>
  );
};

// Step 5: Wrap Your App with the Provider
const App = () => {
  return (
    <ThemeProvider>
      <div style={{ padding: '20px' }}>
        <h1>Theme Context Example</h1>
        <ThemedButton />
      </div>
    </ThemeProvider>
  );
};`}
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">When to Use Context</h2>
          <p className="mb-4">
            Context is primarily used when some data needs to be accessible by many components at different nesting levels.
            Common use cases include:
          </p>

          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Theme data (like dark/light mode)</li>
            <li>User authentication data</li>
            <li>Language preferences</li>
            <li>UI state that affects multiple components</li>
            <li>Shopping cart state in e-commerce applications</li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
            <h3 className="font-semibold text-blue-800">Best Practice</h3>
            <p>
              Don't overuse Context. For simple cases where you only need to pass data to a few levels down, prop drilling might be simpler and more explicit.
              Context is best for truly global or widely-used data.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Context with TypeScript</h2>
          <p className="mb-4">
            When using Context with TypeScript, it's important to properly type your context value:
          </p>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">TypeScript Context Example</h3>
            <CodeEditor
              readOnly
              initialCode={`import React, { createContext, useContext, useState } from 'react';

// Define the shape of your context
type UserContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
};

// Define the User type
type User = {
  id: string;
  username: string;
  email: string;
};

// Create context with a default value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Fake successful login
      if (username === 'user' && password === 'password') {
        setUser({
          id: '1',
          username,
          email: 'user@example.com'
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isLoading,
    error
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};`}
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Quiz</h2>
          <Quiz
            questions={[
              {
                question: "What problem does the Context API solve?",
                options: [
                  "It makes React components faster",
                  "It prevents prop drilling",
                  "It replaces Redux completely",
                  "It improves SEO for React applications"
                ],
                correctAnswer: 1
              },
              {
                question: "Which hook is used to consume a context?",
                options: [
                  "useContext",
                  "useState",
                  "useReducer",
                  "useEffect"
                ],
                correctAnswer: 0
              },
              {
                question: "When should you use Context API?",
                options: [
                  "For every state in your application",
                  "Only for authentication",
                  "For global state that needs to be accessed by many components",
                  "Only when Redux is not available"
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

export default ContextAPIPage;
