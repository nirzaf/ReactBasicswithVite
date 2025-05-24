import { useContext } from 'react';
import TopicHeader from '../components/TopicHeader';
import CodeEditor from '../components/CodeEditor';
import Quiz from '../components/Quiz';
import { ProgressContext } from '../ProgressContext';

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
        description="Learn how to render lists of data and use keys for efficient updates in React."
      />

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Rendering Lists in React</h2>
          <p className="mb-4">
            In React, you can build collections of elements and include them in JSX using curly braces {}.
            Most commonly, you'll use the JavaScript array method map() to iterate through arrays of data.
          </p>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
            <h3 className="font-semibold text-yellow-800">Key Concept</h3>
            <p>
              When rendering lists in React, each item should have a unique "key" prop to help React identify
              which items have changed, been added, or been removed.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Basic List Rendering</h2>
          <p className="mb-4">
            The most common way to render a list in React is to use the array map() method.
          </p>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Basic List Example</h3>
            <CodeEditor
              readOnly
              initialCode={`import { useState } from 'react';

const FruitList = () => {
  const [fruits, setFruits] = useState<string[]>([
    'Apple', 'Banana', 'Cherry', 'Durian', 'Elderberry'
  ]);

  return (
    <div>
      <h2>Fruit List</h2>
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
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Keys in React Lists</h2>
          <p className="mb-4">
            Keys help React identify which items have changed, are added, or are removed. 
            Keys should be given to the elements inside the array to give the elements a stable identity.
          </p>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Using Keys with Objects</h3>
            <CodeEditor
              readOnly
              initialCode={`import { useState } from 'react';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn React', completed: true },
    { id: 2, text: 'Build an app', completed: false },
    { id: 3, text: 'Deploy to production', completed: false }
  ]);

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {todos.map(todo => (
          // Using the unique id as the key
          <li 
            key={todo.id} 
            onClick={() => toggleTodo(todo.id)}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            {todo.text}
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
          <h2 className="text-2xl font-bold mb-4">Best Practices for Keys</h2>
          <p className="mb-4">
            Here are some best practices to follow when using keys in React lists:
          </p>

          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Use a unique identifier from your data as the key (like IDs from a database)</li>
            <li>Keys should be unique among siblings, but don't need to be globally unique</li>
            <li>Don't use indexes as keys if the order of items may change</li>
            <li>Don't generate keys on the fly (e.g., using Math.random())</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Quiz</h2>
          <Quiz
            questions={[
              {
                question: "Why are keys important in React lists?",
                options: [
                  "They improve the visual appearance of lists",
                  "They help React identify which items have changed, been added, or been removed",
                  "They are required by the JavaScript map() function",
                  "They make the list items clickable"
                ],
                correctAnswer: 1
              },
              {
                question: "What is the best choice for a key in a list?",
                options: [
                  "The array index",
                  "A random number",
                  "A unique ID from your data",
                  "The item's content"
                ],
                correctAnswer: 2
              },
              {
                question: "When is it acceptable to use the array index as a key?",
                options: [
                  "Always",
                  "When the list is static and will not change",
                  "When the list items don't have stable IDs",
                  "Both B and C"
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

export default ListsKeysPage;
