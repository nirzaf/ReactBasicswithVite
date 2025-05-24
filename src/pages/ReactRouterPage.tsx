import { useContext } from 'react';
import TopicHeader from '../components/TopicHeader';
import CodeEditor from '../components/CodeEditor';
import Quiz from '../components/Quiz';
import { ProgressContext } from '../ProgressContext';

const ReactRouterPage = () => {
  const { markTopicComplete, updateQuizScore } = useContext(ProgressContext);

  const handleQuizComplete = (score: number) => {
    updateQuizScore('react-router', score);
    if (score >= 70) {
      markTopicComplete('react-router');
    }
  };

  return (
    <div>
      <TopicHeader
        title="React Router"
        topicId="react-router"
        description="Learn how to implement client-side routing in your React applications."
      />

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Introduction to React Router</h2>
          <p className="mb-4">
            React Router is a standard library for routing in React applications. It enables navigation
            between different components in a React application, allowing for a single-page application experience
            where the UI updates without full page reloads.
          </p>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
            <h3 className="font-semibold text-yellow-800">Key Concept</h3>
            <p>
              React Router keeps your UI in sync with the URL by having components render based on the URL path.
              This creates a more intuitive navigation experience for users.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Basic Routing</h2>
          <p className="mb-4">
            Here's a basic example of setting up routes in a React application:
          </p>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Basic Routing Example</h3>
            <CodeEditor
              readOnly
              initialCode={`import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Components for our routes
const Home = () => <h2>Home Page</h2>;
const About = () => <h2>About Page</h2>;
const Contact = () => <h2>Contact Page</h2>;

const App = () => {
  return (
    <BrowserRouter>
      {/* Navigation */}
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>

      {/* Route definitions */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
};`}
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Route Parameters</h2>
          <p className="mb-4">
            React Router allows you to define routes with parameters, which are useful for dynamic content:
          </p>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Route Parameters Example</h3>
            <CodeEditor
              readOnly
              initialCode={`import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

// User detail component that uses the URL parameter
const UserDetail = () => {
  // Extract the userId parameter from the URL
  const { userId } = useParams<{ userId: string }>();
  
  return (
    <div>
      <h2>User Details</h2>
      <p>Viewing user with ID: {userId}</p>
    </div>
  );
};

// List of users with links to their detail pages
const UserList = () => {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
  ];
  
  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link to={\`/users/\${user.id}\`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/users">Users</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<h2>Home Page</h2>} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:userId" element={<UserDetail />} />
      </Routes>
    </BrowserRouter>
  );
};`}
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Nested Routes</h2>
          <p className="mb-4">
            React Router supports nested routes, which are useful for complex layouts:
          </p>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Nested Routes Example</h3>
            <CodeEditor
              readOnly
              initialCode={`import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';

// Layout component with nested routes
const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="/dashboard/stats">Stats</Link></li>
          <li><Link to="/dashboard/profile">Profile</Link></li>
          <li><Link to="/dashboard/settings">Settings</Link></li>
        </ul>
      </nav>
      
      {/* This is where the nested route components will render */}
      <Outlet />
    </div>
  );
};

// Components for nested routes
const Stats = () => <div>Statistics Dashboard</div>;
const Profile = () => <div>User Profile</div>;
const Settings = () => <div>Account Settings</div>;

const App = () => {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<h2>Home Page</h2>} />
        
        {/* Parent route */}
        <Route path="/dashboard" element={<Dashboard />}>
          {/* Nested routes */}
          <Route index element={<Stats />} /> {/* Default nested route */}
          <Route path="stats" element={<Stats />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
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
                question: "What is the main purpose of React Router?",
                options: [
                  "To manage state in React applications",
                  "To enable client-side routing in React applications",
                  "To optimize React performance",
                  "To connect React to backend APIs"
                ],
                correctAnswer: 1
              },
              {
                question: "Which component is used to define a route in React Router v6?",
                options: [
                  "<Switch>",
                  "<Router>",
                  "<Route>",
                  "<Path>"
                ],
                correctAnswer: 2
              },
              {
                question: "How do you access URL parameters in a component using React Router?",
                options: [
                  "Using the useParams hook",
                  "Using props.match.params",
                  "Using the useLocation hook",
                  "Using the useHistory hook"
                ],
                correctAnswer: 0
              }
            ]}
            onComplete={handleQuizComplete}
          />
        </section>
      </div>
    </div>
  );
};

export default ReactRouterPage;
