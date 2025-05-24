import { useContext } from 'react';
import TopicHeader from '../components/TopicHeader';
import CodeEditor from '../components/CodeEditor';
import Quiz from '../components/Quiz';
import { ProgressContext } from '../context/ProgressContext';

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
        description="Learn how to implement client-side routing in React applications using React Router."
      />

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Introduction to React Router</h2>
          <p className="mb-4">
            React Router is a standard library for routing in React applications. It enables navigation 
            among views in a React application, allows the browser URL to be changed, and keeps the UI 
            in sync with the URL.
          </p>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
            <h3 className="font-semibold text-yellow-800">Key Concept</h3>
            <p>
              React Router allows you to handle routing declaratively. The router components render 
              different components based on the current URL path, enabling the creation of single-page 
              applications with multiple views.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Why Use React Router?</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Create a multi-page feel in a single-page application</li>
              <li>Allow users to bookmark specific views</li>
              <li>Enable the use of browser navigation (back/forward buttons)</li>
              <li>Improve user experience with faster page transitions</li>
              <li>Organize your application into logical sections</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Installing React Router</h2>
          <p className="mb-4">
            To use React Router in your project, you need to install it first. React Router v6 is the 
            latest major version at the time of writing.
          </p>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Installation</h3>
            <CodeEditor
              readOnly
              initialCode={`# Using npm
npm install react-router-dom

# Using yarn
yarn add react-router-dom

# Using pnpm
pnpm add react-router-dom`}
            />
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
            <h3 className="font-semibold text-blue-800">TypeScript Support</h3>
            <p>
              React Router includes TypeScript definitions, so you don't need to install any additional 
              packages for TypeScript support.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Basic Routing</h2>
          <p className="mb-4">
            Let's start with a basic example of setting up routes in a React application.
          </p>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Basic Routing Example</h3>
            <CodeEditor
              readOnly
              initialCode={`import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Define some simple page components
const Home = () => <h2>Home Page</h2>;
const About = () => <h2>About Page</h2>;
const Contact = () => <h2>Contact Page</h2>;
const NotFound = () => <h2>404 - Page Not Found</h2>;

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <h1>My React Router App</h1>
        
        {/* Define routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;`}
            />
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
            <h3 className="font-semibold text-yellow-800">Key Components</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>BrowserRouter</strong>: Wraps your application and provides routing functionality</li>
              <li><strong>Routes</strong>: A container for Route components that defines the routing structure</li>
              <li><strong>Route</strong>: Maps a URL path to a component</li>
              <li><strong>path="*"</strong>: A wildcard route that matches any path not explicitly defined (useful for 404 pages)</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Navigation Links</h2>
          <p className="mb-4">
            To navigate between routes, React Router provides the <code>Link</code> and <code>NavLink</code> components.
          </p>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Navigation Example</h3>
            <CodeEditor
              readOnly
              initialCode={`import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';

// Define some simple page components
const Home = () => <h2>Home Page</h2>;
const About = () => <h2>About Page</h2>;
const Contact = () => <h2>Contact Page</h2>;
const NotFound = () => <h2>404 - Page Not Found</h2>;

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <h1>My React Router App</h1>
        
        {/* Navigation menu */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
        
        {/* Alternative navigation with NavLink (adds active class) */}
        <nav className="mt-4">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive ? "active-link" : "link"
            }
            style={({ isActive }) => ({
              fontWeight: isActive ? 'bold' : 'normal',
            })}
          >
            Home
          </NavLink>
          {" | "}
          <NavLink 
            to="/about"
            className={({ isActive }) => 
              isActive ? "active-link" : "link"
            }
          >
            About
          </NavLink>
          {" | "}
          <NavLink 
            to="/contact"
            className={({ isActive }) => 
              isActive ? "active-link" : "link"
            }
          >
            Contact
          </NavLink>
        </nav>
        
        {/* Define routes */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;`}
            />
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
            <h3 className="font-semibold text-blue-800">Link vs. NavLink</h3>
            <p>
              Both <code>Link</code> and <code>NavLink</code> create an anchor tag that navigates to a route 
              without refreshing the page. The difference is:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><strong>Link</strong>: Basic navigation component</li>
              <li><strong>NavLink</strong>: Adds styling attributes when the link's route is active</li>
            </ul>
            <p className="mt-2">
              Use <code>NavLink</code> when you want to highlight the active navigation item.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Route Parameters</h2>
          <p className="mb-4">
            Route parameters allow you to capture values from the URL and pass them to your components.
          </p>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Route Parameters Example</h3>
            <CodeEditor
              readOnly
              initialCode={`import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

// Home component
const Home = () => {
  return (
    <div>
      <h2>Product List</h2>
      <ul>
        <li>
          <Link to="/products/1">Product 1</Link>
        </li>
        <li>
          <Link to="/products/2">Product 2</Link>
        </li>
        <li>
          <Link to="/products/3">Product 3</Link>
        </li>
      </ul>
    </div>
  );
};

// Product detail component that uses the URL parameter
const ProductDetail = () => {
  // Extract the productId parameter from the URL
  const { productId } = useParams();
  
  return (
    <div>
      <h2>Product Detail</h2>
      <p>You are viewing product ID: {productId}</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

const NotFound = () => <h2>404 - Page Not Found</h2>;

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <h1>My E-commerce App</h1>
        
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Dynamic route with parameter */}
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;`}
            />
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
            <h3 className="font-semibold text-yellow-800">Using Route Parameters</h3>
            <p>
              To define a route parameter, use a colon followed by the parameter name in the path:
              <code>path="/products/:productId"</code>
            </p>
            <p className="mt-2">
              To access the parameter value in your component, use the <code>useParams</code> hook:
              <code>const {'{ productId }'} = useParams();</code>
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Nested Routes</h2>
          <p className="mb-4">
            React Router allows you to nest routes, which is useful for creating layouts with 
            multiple levels of navigation.
          </p>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Nested Routes Example</h3>
            <CodeEditor
              readOnly
              initialCode={`import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';

// Layout component with navigation and outlet for nested routes
const Layout = () => {
  return (
    <div>
      <header>
        <h1>My App</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/products">Products</Link></li>
          </ul>
        </nav>
      </header>
      
      <main>
        {/* Outlet renders the matching child route */}
        <Outlet />
      </main>
      
      <footer>
        <p>© 2025 My App</p>
      </footer>
    </div>
  );
};

// Home page
const Home = () => <h2>Home Page</h2>;

// About page
const About = () => <h2>About Page</h2>;

// Products layout with its own navigation
const ProductsLayout = () => {
  return (
    <div>
      <h2>Products</h2>
      
      <nav>
        <ul>
          <li><Link to="/products/featured">Featured</Link></li>
          <li><Link to="/products/new">New Arrivals</Link></li>
          <li><Link to="/products/sale">On Sale</Link></li>
        </ul>
      </nav>
      
      {/* Nested outlet for product routes */}
      <div className="product-content">
        <Outlet />
      </div>
    </div>
  );
};

// Product category pages
const FeaturedProducts = () => <div>Featured Products List</div>;
const NewProducts = () => <div>New Arrivals List</div>;
const SaleProducts = () => <div>On Sale List</div>;

// Default products page
const ProductsIndex = () => <div>Select a category above</div>;

// Not found page
const NotFound = () => <h2>404 - Page Not Found</h2>;

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main layout with nested routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          
          {/* Nested products routes */}
          <Route path="products" element={<ProductsLayout />}>
            <Route index element={<ProductsIndex />} />
            <Route path="featured" element={<FeaturedProducts />} />
            <Route path="new" element={<NewProducts />} />
            <Route path="sale" element={<SaleProducts />} />
          </Route>
          
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;`}
            />
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
            <h3 className="font-semibold text-blue-800">Key Concepts for Nested Routes</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Outlet</strong>: A component that renders the matching child route</li>
              <li><strong>index</strong>: A special property that defines the default route when the parent path is matched exactly</li>
              <li><strong>Nested Routes</strong>: Routes defined as children of another route</li>
            </ul>
            <p className="mt-2">
              Nested routes are powerful for creating complex layouts with shared UI elements.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Programmatic Navigation</h2>
          <p className="mb-4">
            Sometimes you need to navigate programmatically, such as after form submission or based on 
            certain conditions. React Router provides the <code>useNavigate</code> hook for this purpose.
          </p>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Programmatic Navigation Example</h3>
            <CodeEditor
              readOnly
              initialCode={`import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';

// Login component with programmatic navigation
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (username === 'user' && password === 'password') {
      // Simulate successful login
      console.log('Login successful');
      
      // Navigate to dashboard and pass state
      navigate('/dashboard', { 
        state: { username },
        replace: true // Replace the current entry in the history stack
      });
    } else {
(Content truncated due to size limit. Use line ranges to read in chunks)