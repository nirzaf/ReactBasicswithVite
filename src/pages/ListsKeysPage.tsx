import { useContext } from 'react';
import TopicHeader from '../components/TopicHeader';
import CodeEditor from '../components/CodeEditor';
import Quiz from '../components/Quiz';
import { ProgressContext } from '../context/ProgressContext';

const ListsKeysPage = () => {
  const { markTopicComplete, updateQuizScore } = useContext(ProgressContext);

  const handleQuizComplete = (score: number) => {
    updateQuizScore('lists-keys', score);
    if (score >= 70) {
      markTopicComplete('lists-keys');
    }
  };

  return (
    <div>
      <TopicHeader
        title="Lists and Keys"
        topicId="lists-keys"
        description="Learn how to render lists of data efficiently in React using keys."
      />

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Rendering Lists in React</h2>
          <p className="mb-4">
            Rendering lists of data is a common task in web applications. React provides a powerful way to 
            render lists using JavaScript's array methods, particularly <code>map()</code>.
          </p>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
            <h3 className="font-semibold text-yellow-800">Key Concept</h3>
            <p>
              In React, you transform arrays into lists of elements using the JavaScript <code>map()</code> function 
              and render them in your JSX.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Basic List Rendering Example</h3>
            <CodeEditor
              readOnly
              initialCode={`import React from 'react';

const SimpleList = () => {
  const fruits = ['Apple', 'Banana', 'Cherry', 'Durian', 'Elderberry'];

  return (
    <div>
      <h2>Fruit List</h2>
      <ul>
        {fruits.map((fruit) => (
          <li>{fruit}</li>
        ))}
      </ul>
    </div>
  );
};`}
            />
          </div>

          <p className="mb-4">
            The code above will render a list of fruits, but React will give you a warning in the console:
            <code>Warning: Each child in a list should have a unique "key" prop.</code>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Understanding Keys</h2>
          <p className="mb-4">
            Keys help React identify which items have changed, are added, or are removed. Keys should be given 
            to the elements inside the array to give the elements a stable identity.
          </p>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Adding Keys to List Items</h3>
            <CodeEditor
              readOnly
              initialCode={`import React from 'react';

const ListWithKeys = () => {
  const fruits = ['Apple', 'Banana', 'Cherry', 'Durian', 'Elderberry'];

  return (
    <div>
      <h2>Fruit List with Keys</h2>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
};`}
            />
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
            <h3 className="font-semibold text-yellow-800">Important Note on Keys</h3>
            <p>
              While using the array index as a key is better than no key at all, it's not recommended if:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>The list items can be reordered</li>
              <li>Items can be inserted or deleted from the middle of the list</li>
              <li>The list can be filtered</li>
            </ul>
            <p className="mt-2">
              In these cases, using a unique and stable identifier from your data is much better.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Using Unique IDs as Keys</h3>
            <CodeEditor
              readOnly
              initialCode={`import React from 'react';

const ListWithUniqueKeys = () => {
  const fruits = [
    { id: 'fruit-1', name: 'Apple' },
    { id: 'fruit-2', name: 'Banana' },
    { id: 'fruit-3', name: 'Cherry' },
    { id: 'fruit-4', name: 'Durian' },
    { id: 'fruit-5', name: 'Elderberry' }
  ];

  return (
    <div>
      <h2>Fruit List with Unique Keys</h2>
      <ul>
        {fruits.map((fruit) => (
          <li key={fruit.id}>{fruit.name}</li>
        ))}
      </ul>
    </div>
  );
};`}
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Why Keys Matter</h2>
          <p className="mb-4">
            Keys serve as a hint to React about the identity of each component in a list. This helps React 
            determine which items have changed, been added, or been removed, which is crucial for efficient updates.
          </p>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Keys and Component State</h3>
            <p className="mb-3">
              When components have state, that state is tied to the component based on its key. If the key changes, 
              React will create a new component instance instead of updating the existing one.
            </p>
            <CodeEditor
              readOnly
              initialCode={`import React, { useState } from 'react';

const CounterItem = ({ id, name }) => {
  // Each component instance maintains its own state
  const [count, setCount] = useState(0);

  return (
    <li>
      {name}: {count}
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </li>
  );
};

const CounterList = () => {
  const items = [
    { id: 'item-1', name: 'Item 1' },
    { id: 'item-2', name: 'Item 2' },
    { id: 'item-3', name: 'Item 3' }
  ];

  return (
    <div>
      <h2>Counter List</h2>
      <ul>
        {items.map((item) => (
          <CounterItem 
            key={item.id} 
            id={item.id} 
            name={item.name} 
          />
        ))}
      </ul>
    </div>
  );
};`}
            />
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
            <h3 className="font-semibold text-blue-800">Key Rules</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Keys must be unique among siblings (not globally)</li>
              <li>Keys should be stable, predictable, and unique</li>
              <li>Don't generate keys on the fly (e.g., using <code>Math.random()</code>)</li>
              <li>Keys are not passed to your components as props (unless you explicitly pass them)</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Extracting Components with Keys</h2>
          <p className="mb-4">
            When extracting components that render list items, make sure to keep the key with the component 
            that's directly inside the <code>map()</code> call.
          </p>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Correct Key Placement</h3>
            <CodeEditor
              readOnly
              initialCode={`import React from 'react';

// Item component
const TodoItem = ({ text, completed }) => {
  return (
    <li style={{ textDecoration: completed ? 'line-through' : 'none' }}>
      {text}
    </li>
  );
};

// Incorrect: Key should be on the component in the map
const IncorrectTodoList = () => {
  const todos = [
    { id: 't1', text: 'Learn React', completed: true },
    { id: 't2', text: 'Build an app', completed: false },
    { id: 't3', text: 'Deploy to production', completed: false }
  ];

  return (
    <ul>
      {todos.map((todo) => (
        // Wrong: The key should be here, not on the li inside TodoItem
        <TodoItem 
          text={todo.text} 
          completed={todo.completed} 
        />
      ))}
    </ul>
  );
};

// Correct: Key is on the component in the map
const CorrectTodoList = () => {
  const todos = [
    { id: 't1', text: 'Learn React', completed: true },
    { id: 't2', text: 'Build an app', completed: false },
    { id: 't3', text: 'Deploy to production', completed: false }
  ];

  return (
    <ul>
      {todos.map((todo) => (
        // Correct: Key is here on the component returned by map
        <TodoItem 
          key={todo.id}
          text={todo.text} 
          completed={todo.completed} 
        />
      ))}
    </ul>
  );
};`}
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Advanced List Rendering Techniques</h2>
          
          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Rendering Lists with Different Components</h3>
            <CodeEditor
              readOnly
              initialCode={`import React from 'react';

const MessageItem = ({ message }) => {
  // Different component based on message type
  if (message.type === 'text') {
    return (
      <div className="message text-message">
        <p>{message.content}</p>
        <small>{message.timestamp}</small>
      </div>
    );
  } else if (message.type === 'image') {
    return (
      <div className="message image-message">
        <img src={message.content} alt="Message" />
        <small>{message.timestamp}</small>
      </div>
    );
  } else if (message.type === 'notification') {
    return (
      <div className="message notification-message">
        <em>{message.content}</em>
        <small>{message.timestamp}</small>
      </div>
    );
  }
  
  // Default fallback
  return (
    <div className="message unknown-message">
      <p>Unknown message type</p>
    </div>
  );
};

const MessageList = () => {
  const messages = [
    { id: 'm1', type: 'text', content: 'Hello there!', timestamp: '10:00 AM' },
    { id: 'm2', type: 'notification', content: 'Alice joined the chat', timestamp: '10:01 AM' },
    { id: 'm3', type: 'image', content: 'https://example.com/image.jpg', timestamp: '10:02 AM' },
    { id: 'm4', type: 'text', content: 'How are you?', timestamp: '10:03 AM' }
  ];

  return (
    <div className="message-list">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </div>
  );
};`}
            />
          </div>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Nested Lists</h3>
            <CodeEditor
              readOnly
              initialCode={`import React from 'react';

const NestedList = () => {
  const categories = [
    { 
      id: 'c1', 
      name: 'Fruits', 
      items: [
        { id: 'f1', name: 'Apple' },
        { id: 'f2', name: 'Banana' },
        { id: 'f3', name: 'Cherry' }
      ]
    },
    { 
      id: 'c2', 
      name: 'Vegetables', 
      items: [
        { id: 'v1', name: 'Carrot' },
        { id: 'v2', name: 'Broccoli' },
        { id: 'v3', name: 'Spinach' }
      ]
    },
    { 
      id: 'c3', 
      name: 'Dairy', 
      items: [
        { id: 'd1', name: 'Milk' },
        { id: 'd2', name: 'Cheese' },
        { id: 'd3', name: 'Yogurt' }
      ]
    }
  ];

  return (
    <div>
      <h2>Food Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <h3>{category.name}</h3>
            <ul>
              {category.items.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};`}
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">List Manipulation</h2>
          <p className="mb-4">
            In React applications, you often need to manipulate lists by adding, removing, or updating items.
          </p>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Adding, Removing, and Updating List Items</h3>
            <CodeEditor
              readOnly
              initialCode={`import React, { useState } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a project', completed: false }
  ]);
  const [newTodoText, setNewTodoText] = useState('');

  // Add a new todo
  const addTodo = () => {
    if (newTodoText.trim() === '') return;
    
    // Create a new todo with a unique ID
    const newTodo = {
      id: Date.now(), // Simple way to generate unique IDs
      text: newTodoText,
      completed: false
    };
    
    // Add the new todo to the list (creating a new array)
    setTodos([...todos, newTodo]);
    setNewTodoText(''); // Clear the input
  };

  // Remove a todo
  const removeTodo = (id) => {
    // Filter out the todo with the matching ID
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Toggle a todo's completed status
  const toggleTodo = (id) => {
    // Map over todos and update the matching one
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed } 
        : todo
    ));
  };

  return (
    <div>
      <h2>Todo List</h2>
      
      {/* Form to add new todos */}
      <div>
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add a new todo"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      
      {/* List of todos */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{ 
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer'
              }}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <button onClick={() => removeTodo(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      
      {/* Show message if no todos */}
      {todos.length === 0 && (
        <p>No todos yet. Add one above!</p>
      )}
    </div>
  );
};`}
            />
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
            <h3 className="font-semibold text-yellow-800">Immutability Principle</h3>
            <p>
              In React, you should never modify state directly. Instead, create new arrays or objects 
              when updating state. This is why we use methods like <code>map()</code>, <code>filter()</code>, 
              and the spread operator <code>...</code> to create new arrays.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Performance Considerations</h2>
          <p className="mb-4">
            When rendering large lists, performance can become an issue. Here are some techniques to optimize list rendering.
          </p>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Virtualized Lists</h3>
            <p className="mb-3">
              For very long lists, you can use virtualization to only render items that are currently visible 
              in the viewport. Libraries like <code>react-window</code> and <code>react-virtualized</code> help with this.
            </p>
            <CodeEditor
              readOnly
              initialCode={`import React from 'react';
import { FixedSizeList } from 'react-window';

const VirtualizedList = () => {
  //
(Content truncated due to size limit. Use line ranges to read in chunks)