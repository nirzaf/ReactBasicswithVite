import { useContext } from 'react';
import TopicHeader from '../components/TopicHeader';
import CodeEditor from '../components/CodeEditor';
import Quiz from '../components/Quiz';
import { ProgressContext } from '../context/ProgressContext';

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
        title="Forms and Controlled Components"
        topicId="forms"
        description="Learn how to handle form inputs and create controlled components in React."
      />

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Introduction to Forms in React</h2>
          <p className="mb-4">
            Forms are a fundamental part of web applications, allowing users to input data. In React, 
            working with forms is slightly different from traditional HTML forms because React maintains 
            its own state.
          </p>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
            <h3 className="font-semibold text-yellow-800">Key Concept</h3>
            <p>
              In React, there are two main approaches to handling form inputs:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><strong>Controlled Components</strong>: Form elements are controlled by React state</li>
              <li><strong>Uncontrolled Components</strong>: Form elements maintain their own state</li>
            </ul>
            <p className="mt-2">
              Controlled components are generally preferred in React applications.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Controlled Components</h2>
          <p className="mb-4">
            In a controlled component, form data is handled by the React component's state. 
            The component controls what happens in the form on subsequent user input.
          </p>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Basic Controlled Input Example</h3>
            <CodeEditor
              readOnly
              initialCode={`import { useState } from 'react';

const ControlledInput = () => {
  // State to store the input value
  const [name, setName] = useState('');

  // Event handler for input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // Event handler for form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission
    alert(\`Submitted name: \${name}\`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input 
          type="text" 
          value={name} 
          onChange={handleChange} 
        />
      </label>
      <button type="submit">Submit</button>
      
      {/* Display the current value */}
      <p>Current value: {name}</p>
    </form>
  );
};`}
            />
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
            <h3 className="font-semibold text-blue-800">How Controlled Components Work</h3>
            <ol className="list-decimal pl-6 space-y-1">
              <li>The React component renders a form element with its value set to a state variable</li>
              <li>When the user types, the <code>onChange</code> event handler updates the state</li>
              <li>The component re-renders with the new state value</li>
              <li>The input's displayed value matches the component's state</li>
            </ol>
            <p className="mt-2">
              This creates a "single source of truth" for the input's value, giving you complete control over the form.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Handling Different Input Types</h2>
          <p className="mb-4">
            React can handle all the standard HTML form elements as controlled components. 
            Let's look at how to handle different types of inputs.
          </p>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Text Inputs and Textareas</h3>
            <CodeEditor
              readOnly
              initialCode={`import { useState } from 'react';

const TextInputsExample = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    bio: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <label htmlFor="bio">Bio:</label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
        />
      </div>
      
      <button type="submit">Submit</button>
    </form>
  );
};`}
            />
          </div>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Checkboxes and Radio Buttons</h3>
            <CodeEditor
              readOnly
              initialCode={`import { useState } from 'react';

const CheckboxRadioExample = () => {
  const [formData, setFormData] = useState({
    isSubscribed: false,
    gender: 'prefer-not-to-say',
    interests: {
      sports: false,
      music: false,
      reading: false,
      coding: false
    }
  });

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  // Handle nested checkbox changes (for interests)
  const handleInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      interests: {
        ...formData.interests,
        [name]: checked
      }
    });
  };

  // Handle radio button changes
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          <input
            type="checkbox"
            name="isSubscribed"
            checked={formData.isSubscribed}
            onChange={handleCheckboxChange}
          />
          Subscribe to newsletter
        </label>
      </div>
      
      <div>
        <p>Gender:</p>
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={formData.gender === 'male'}
            onChange={handleRadioChange}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={formData.gender === 'female'}
            onChange={handleRadioChange}
          />
          Female
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="prefer-not-to-say"
            checked={formData.gender === 'prefer-not-to-say'}
            onChange={handleRadioChange}
          />
          Prefer not to say
        </label>
      </div>
      
      <div>
        <p>Interests:</p>
        <label>
          <input
            type="checkbox"
            name="sports"
            checked={formData.interests.sports}
            onChange={handleInterestChange}
          />
          Sports
        </label>
        <label>
          <input
            type="checkbox"
            name="music"
            checked={formData.interests.music}
            onChange={handleInterestChange}
          />
          Music
        </label>
        <label>
          <input
            type="checkbox"
            name="reading"
            checked={formData.interests.reading}
            onChange={handleInterestChange}
          />
          Reading
        </label>
        <label>
          <input
            type="checkbox"
            name="coding"
            checked={formData.interests.coding}
            onChange={handleInterestChange}
          />
          Coding
        </label>
      </div>
      
      <button type="submit">Submit</button>
    </form>
  );
};`}
            />
          </div>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Select Dropdowns</h3>
            <CodeEditor
              readOnly
              initialCode={`import { useState } from 'react';

const SelectExample = () => {
  const [formData, setFormData] = useState({
    country: '',
    languages: []
  });

  // Handle single select change
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle multi-select change
  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name } = e.target;
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    
    setFormData({
      ...formData,
      [name]: selectedOptions
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="country">Country:</label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleSelectChange}
        >
          <option value="">-- Select a country --</option>
          <option value="us">United States</option>
          <option value="ca">Canada</option>
          <option value="uk">United Kingdom</option>
          <option value="au">Australia</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="languages">Languages (hold Ctrl/Cmd to select multiple):</label>
        <select
          id="languages"
          name="languages"
          multiple
          value={formData.languages}
          onChange={handleMultiSelectChange}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="csharp">C#</option>
          <option value="ruby">Ruby</option>
        </select>
      </div>
      
      <button type="submit">Submit</button>
    </form>
  );
};`}
            />
          </div>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">File Inputs</h3>
            <CodeEditor
              readOnly
              initialCode={`import { useState, useRef } from 'react';

const FileInputExample = () => {
  // For file inputs, we typically use a combination of state and refs
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Check if files exist and at least one file is selected
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Access the file using the ref
    const fileInput = fileInputRef.current;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      console.log('Selected file:', file);
      
      // Here you would typically upload the file to a server
      // using FormData and fetch or axios
      
      // Example:
      // const formData = new FormData();
      // formData.append('file', file);
      // fetch('/upload', { method: 'POST', body: formData });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="file">Select a file:</label>
        <input
          type="file"
          id="file"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        {fileName && <p>Selected file: {fileName}</p>}
      </div>
      
      <button type="submit">Upload</button>
    </form>
  );
};`}
            />
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
            <h3 className="font-semibold text-yellow-800">Note on File Inputs</h3>
            <p>
              File inputs are inherently uncontrolled in React because their value can only be set by the user, 
              not programmatically due to security reasons. We typically use a combination of refs and state to 
              work with file inputs.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Handling Multiple Inputs</h2>
          <p className="mb-4">
            When dealing with multiple form inputs, it can be tedious to write an onChange handler for each one. 
            A common pattern is to use a single handler function with computed property names.
          </p>

          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">Multiple Inputs Example</h3>
            <CodeEditor
              readOnly
              initialCode={`import { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  
  // Generic handler for all input types
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    // Use the checked property for checkboxes, value for everything else
    const inputValue = type === 'checkbox' ? checked : value;
    
    setFormData({
      ...formData,
      [name]: inputValue
    });
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (!formData.agreeToTerms) {
      alert('You must agree to the terms and conditions.');
      return;
    }
    
    console.log('Form submitted:', formData);
    // Here you would typically send the data to a server
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
       
(Content truncated due to size limit. Use line ranges to read in chunks)