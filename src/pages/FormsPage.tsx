import { useContext } from 'react';
import TopicHeader from '../components/TopicHeader';
import CodeEditor from '../components/CodeEditor';
import Quiz from '../components/Quiz';
import { ProgressContext } from '../ProgressContext';

const FormsPage = () => {
  const { markTopicComplete, updateQuizScore } = useContext(ProgressContext);

  const handleQuizComplete = (score: number) => {
    updateQuizScore('forms', score);
    if (score >= 70) {
      markTopicComplete('forms');
    }
  };

  return (
    <div>
      <TopicHeader
        title="Forms in React"
        topicId="forms"
        description="Learn how to handle forms and user input in React applications."
      />

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Controlled Components</h2>
          <p className="mb-4">
            In HTML, form elements like input, textarea, and select typically maintain their own state and update it based on user input.
            In React, we often want to have React state be the "single source of truth" - this is called a "controlled component".
          </p>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
            <h3 className="font-semibold text-yellow-800">Key Concept</h3>
            <p>
              A controlled component is one where form data is handled by the React component state.
              The component controls what happens in the form on every user input.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Basic Form Handling</h2>
          <p className="mb-4">
            Here's a basic example of a controlled form component in React:
          </p>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Controlled Form Example</h3>
            <CodeEditor
              readOnly
              initialCode={`import { useState, FormEvent } from 'react';

const SimpleForm = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ name, email, message });
    alert(\`Form submitted with: \${name}, \${email}, \${message}\`);
    
    // Reset form
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-1">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block mb-1">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block mb-1">Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          rows={4}
        />
      </div>
      
      <button 
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};`}
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Handling Multiple Inputs</h2>
          <p className="mb-4">
            When dealing with multiple inputs, you can use a single state object and the input's name attribute to handle all inputs:
          </p>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Multiple Inputs Example</h3>
            <CodeEditor
              readOnly
              initialCode={`import { useState, FormEvent, ChangeEvent } from 'react';

type FormData = {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  agreeToTerms: boolean;
};

const RegistrationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    role: 'user',
    agreeToTerms: false
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    // Handle checkboxes separately
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    alert('Registration form submitted!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="username" className="block mb-1">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block mb-1">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      
      <div>
        <label htmlFor="password" className="block mb-1">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      
      <div>
        <label htmlFor="role" className="block mb-1">Role:</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      
      <div className="flex items-center">
        <input
          type="checkbox"
          id="agreeToTerms"
          name="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={handleChange}
          className="mr-2"
          required
        />
        <label htmlFor="agreeToTerms">
          I agree to the terms and conditions
        </label>
      </div>
      
      <button 
        type="submit"
        disabled={!formData.agreeToTerms}
        className={
          formData.agreeToTerms 
            ? "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" 
            : "bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
        }
      >
        Register
      </button>
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
                question: "What is a controlled component in React?",
                options: [
                  "A component that controls other components",
                  "A form element whose value is controlled by React state",
                  "A component that can't be modified by users",
                  "A component with restricted permissions"
                ],
                correctAnswer: 1
              },
              {
                question: "How do you prevent the default form submission behavior in React?",
                options: [
                  "return false in the onSubmit handler",
                  "Use preventDefault() on the event object",
                  "Set the form's action attribute to '#'",
                  "Use the noSubmit attribute on the form"
                ],
                correctAnswer: 1
              },
              {
                question: "When using the onChange event handler with an input, what is passed to the function?",
                options: [
                  "The new value as a string",
                  "A boolean indicating if the value changed",
                  "An event object containing the target element",
                  "The input element itself"
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

export default FormsPage;
