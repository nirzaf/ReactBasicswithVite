// React is imported automatically by the JSX transform
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { ProgressProvider } from './ProgressContext';
import HomePage from './pages/HomePage';
import ComponentsJSXPage from './pages/ComponentsJSXPage';
import PropsStatePage from './pages/PropsStatePage';
import HooksPage from './pages/HooksPage';
import EventHandlingPage from './pages/EventHandlingPage';
import ConditionalRenderingPage from './pages/ConditionalRenderingPage';
import ListsKeysPage from './pages/ListsKeysPage';
import FormsPage from './pages/FormsPage';
import ContextAPIPage from './pages/ContextAPIPage';
import ReactRouterPage from './pages/ReactRouterPage';

function App() {
  return (
    <ProgressProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/components-jsx" element={<ComponentsJSXPage />} />
            <Route path="/props-state" element={<PropsStatePage />} />
            <Route path="/hooks" element={<HooksPage />} />
            <Route path="/event-handling" element={<EventHandlingPage />} />
            <Route path="/conditional-rendering" element={<ConditionalRenderingPage />} />
            <Route path="/lists-keys" element={<ListsKeysPage />} />
            <Route path="/forms" element={<FormsPage />} />
            <Route path="/context-api" element={<ContextAPIPage />} />
            <Route path="/react-router" element={<ReactRouterPage />} />
          </Routes>
        </Layout>
      </Router>
    </ProgressProvider>
  );
}

export default App;
