import { useContext } from 'react';
import TopicHeader from '../components/TopicHeader';
import CodeEditor from '../components/CodeEditor';
import Quiz from '../components/Quiz';
import { ProgressContext } from '../context/ProgressContext';

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
        description="Learn how to manage global state and share data across components using React's Context API."
      />

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Introduction to Context API</h2>
          <p className="mb-4">
            In React, data is typically passed from parent to child components via props. This approach 
            works well for many cases, but it can become cumbersome when you need to pass data through 
            many levels of components or when many components need the same data.
          </p>
          
          <p className="mb-4">
            The Context API provides a way to share values like themes, user data, or any other global 
            state between components without having to explicitly pass props through every level of the 
            component tree.
          </p>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
            <h3 className="font-semibold text-yellow-800">Key Concept</h3>
            <p>
              Context provides a way to pass data through the component tree without having to pass props 
              down manually at every level. It's designed to share data that can be considered "global" 
              for a tree of React components.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">When to Use Context</h3>
            <p className="mb-3">
              Context is primarily used when some data needs to be accessible by many components at different 
              nesting levels. Common examples include:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Theme data (e.g., light/dark mode)</li>
              <li>User authentication information</li>
              <li>Language preferences</li>
              <li>UI state that affects multiple components</li>
            </ul>
            <p className="mt-3">
              However, context is not always the best solution. For simple cases where you only need to pass 
              data a few levels deep, component composition or prop drilling might be simpler.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Creating and Using Context</h2>
          <p className="mb-4">
            Using the Context API involves three main steps:
          </p>
          <ol className="list-decimal pl-6 space-y-1 mb-4">
            <li>Creating a context using <code>React.createContext()</code></li>
            <li>Providing the context value with a Context Provider</li>
            <li>Consuming the context in components that need the data</li>
          </ol>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Basic Context Example</h3>
            <CodeEditor
              readOnly
              initialCode={`import React, { createContext, useContext, ReactNode } from 'react';

// Step 1: Create a context with a default value
const ThemeContext = createContext('light');

// Step 2: Create a provider component
type ThemeProviderProps = {
  children: ReactNode;
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // In a real app, this might be state that can change
  const theme = 'dark';
  
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

// Step 3: Create components that consume the context
const ThemedButton = () => {
  // Use the useContext hook to access the context value
  const theme = useContext(ThemeContext);
  
  return (
    <button
      style={{
        backgroundColor: theme === 'dark' ? '#333' : '#fff',
        color: theme === 'dark' ? '#fff' : '#333',
        padding: '8px 16px',
        border: '1px solid #ccc',
        borderRadius: '4px'
      }}
    >
      I am styled based on the theme context!
    </button>
  );
};

// A component that doesn't directly use the context
const Toolbar = () => {
  return (
    <div>
      <ThemedButton />
    </div>
  );
};

// The App component that wraps everything with the provider
const App = () => {
  return (
    <ThemeProvider>
      <div>
        <h1>Context API Example</h1>
        <Toolbar />
      </div>
    </ThemeProvider>
  );
};`}
            />
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
            <h3 className="font-semibold text-blue-800">Context with TypeScript</h3>
            <p>
              When using Context with TypeScript, it's important to properly type your context value. 
              This provides better type safety and autocompletion in your IDE.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Context with State</h2>
          <p className="mb-4">
            In most real-world applications, you'll want to combine context with state to create 
            dynamic, updatable contexts. This is typically done using the <code>useState</code> or 
            <code>useReducer</code> hooks.
          </p>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Dynamic Theme Context Example</h3>
            <CodeEditor
              readOnly
              initialCode={`import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of our context
type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

// Create context with a more complete default value
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {}
});

// Create a custom hook for using this context
export const useTheme = () => useContext(ThemeContext);

// Create the provider component
type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // State to hold the current theme
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  // The value that will be provided to consumers
  const value = {
    theme,
    toggleTheme
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Component that consumes the theme context
const ThemedButton = () => {
  // Use our custom hook to access the theme context
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      style={{
        backgroundColor: theme === 'dark' ? '#333' : '#fff',
        color: theme === 'dark' ? '#fff' : '#333',
        padding: '8px 16px',
        border: '1px solid #ccc',
        borderRadius: '4px'
      }}
    >
      Current theme: {theme}. Click to toggle!
    </button>
  );
};

// App component with the provider
const App = () => {
  return (
    <ThemeProvider>
      <div>
        <h1>Dynamic Theme Context</h1>
        <ThemedButton />
      </div>
    </ThemeProvider>
  );
};`}
            />
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
            <h3 className="font-semibold text-yellow-800">Best Practice</h3>
            <p>
              It's a good practice to create a custom hook (like <code>useTheme</code> in the example) 
              that wraps <code>useContext</code>. This makes your code more readable and provides a 
              consistent way to access the context throughout your application.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Using Context with useReducer</h2>
          <p className="mb-4">
            For more complex state logic, you can combine the Context API with <code>useReducer</code>. 
            This pattern is similar to Redux but built into React.
          </p>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Shopping Cart Context Example</h3>
            <CodeEditor
              readOnly
              initialCode={`import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define types for our shopping cart
type Product = {
  id: number;
  name: string;
  price: number;
};

type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  total: number;
};

// Define action types
type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'CLEAR_CART' };

// Define the context type
type CartContextType = {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
};

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create a custom hook for using this context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Create the reducer function
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => item.product.id === action.payload.id
      );
      
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        
        return {
          ...state,
          items: updatedItems,
          total: state.total + action.payload.price
        };
      } else {
        // Item doesn't exist, add it
        return {
          ...state,
          items: [...state.items, { product: action.payload, quantity: 1 }],
          total: state.total + action.payload.price
        };
      }
    }
    
    case 'REMOVE_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => item.product.id === action.payload
      );
      
      if (existingItemIndex >= 0) {
        const item = state.items[existingItemIndex];
        
        if (item.quantity === 1) {
          // Remove the item completely
          return {
            ...state,
            items: state.items.filter(item => item.product.id !== action.payload),
            total: state.total - item.product.price
          };
        } else {
          // Decrease quantity
          const updatedItems = [...state.items];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity - 1
          };
          
          return {
            ...state,
            items: updatedItems,
            total: state.total - item.product.price
          };
        }
      }
      
      return state;
    }
    
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0
      };
    
    default:
      return state;
  }
};

// Create the provider component
type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  // Initialize the reducer with an empty cart
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0
  });
  
  // Helper functions to make using the cart easier
  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };
  
  const removeItem = (productId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  // Create the context value
  const value = {
    state,
    dispatch,
    addItem,
    removeItem,
    clearCart
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Example components that use the cart context
const ProductList = () => {
  const { addItem } = useCart();
  
  const products: Product[] = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 }
  ];
  
  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            "product.name - $\{product.price\}"
            <button onClick={() => addItem(product)}>
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Cart = () => {
  const { state, removeItem, clearCart } = useCart();
  
  return (
    <div>
      <h2>Shopping Cart</h2>
      {state.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {state.items.map(item => (
              <li key={item.product.id}>
"item.product.name - $\{item.product.price\} x item.quantity"
                <button onClick={() => removeItem(item.product.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p>Total: "$\{state.total\}"</p>
          <button onClick={clearCart}>Clear Cart</button>
        </>
      )}
    </div>
  );
};

// App component with the provider
const App = () => {
  return (
    <CartProvider>
      <div>
        <h1>Shopping App</h1>
        <ProductList />
        <Cart />
      </div>
    </CartProvider>
  );
};`}
            />
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
            <h3 className="font-semibold text-blue-800">Context + useReducer Pattern</h3>
            <p>
              The combination of Context and useReducer is powerful for managing complex state that needs 
              to be accessed by many components. This pattern provides:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Centralized state management</li>
              <li>Predictable state updates through actions</li>
              <li>Easier testing and debugging</li>
              <li>A Redux-like experience without additional libraries</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Multiple Contexts</h2>
          <p className="mb-4">
            In larger applications, you might need multiple contexts for different types of data. 
            React allows you to use as many context providers as you need.
          </p>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Multiple Contexts Example</h3>
            <CodeEditor
              readOnly
              initialCode={`import React, { createContext, useContext, useState, ReactNode } from 'react';

// Theme context
type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

const Th
(Content truncated due to size limit. Use line ranges to read in chunks)