import { useContext } from 'react';
import TopicHeader from '../components/TopicHeader';
import CodeEditor from '../components/CodeEditor';
import Quiz from '../components/Quiz';
import { ProgressContext } from '../ProgressContext';

const PropsStatePage = () => {
  const { markTopicComplete, updateQuizScore } = useContext(ProgressContext);

  const handleQuizComplete = (score: number) => {
    updateQuizScore('props-state', score);
    if (score >= 70) {
      markTopicComplete('props-state');
    }
  };

  return (
    <div>
      <TopicHeader
        title="Props and State Management"
        topicId="props-state"
        description="Learn how to pass data between components and manage component state in React."
      />

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Understanding Props</h2>
          <p className="mb-4">
            Props (short for "properties") are a way to pass data from parent to child components. 
            They are read-only and help make your components reusable and dynamic.
          </p>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
            <h3 className="font-semibold text-yellow-800">Key Concept</h3>
            <p>
              Props are immutable (cannot be changed) within the component that receives them. 
              They flow down from parent to child, creating a one-way data flow.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Understanding State</h2>
          <p className="mb-4">
            While props are passed down from parent components, state is managed within a component. 
            State allows React components to change their output over time in response to user actions, 
            network responses, and anything else.
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
            <h3 className="font-semibold text-yellow-800">Key Concept</h3>
            <p>
              State is mutable and belongs to the component. When state changes, the component re-renders.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Quiz</h2>
          <Quiz
            questions={[
              {
                question: "What are props in React?",
                options: [
                  "Internal component state",
                  "Data passed from parent to child components",
                  "CSS properties",
                  "JavaScript properties"
                ],
                correctAnswer: 1
              },
              {
                question: "Can you modify props directly?",
                options: [
                  "Yes, anytime",
                  "Yes, but only in class components",
                  "No, props are read-only",
                  "Yes, but only with setState"
                ],
                correctAnswer: 2
              },
              {
                question: "What hook is used to manage state in functional components?",
                options: [
                  "useProps",
                  "useEffect",
                  "useContext",
                  "useState"
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

export default PropsStatePage;
