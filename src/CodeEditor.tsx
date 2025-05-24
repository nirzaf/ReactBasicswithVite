import { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';

interface CodeEditorProps {
  initialCode: string;
  language?: string;
  onCodeChange?: (code: string) => void;
  readOnly?: boolean;
}

const CodeEditor = ({
  initialCode,
  language = 'tsx',
  onCodeChange,
  readOnly = false,
}: CodeEditorProps) => {
  const [code, setCode] = useState(initialCode);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    if (onCodeChange) {
      onCodeChange(newCode);
    }
  };

  return (
    <div className="relative rounded-md overflow-hidden border border-gray-300 shadow-sm">
      <Highlight theme={themes.nightOwl} code={code} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <div className="relative">
            <pre
              className={`${className} p-4 overflow-auto text-sm`}
              style={{
                ...style,
                margin: 0,
                padding: '1rem',
                maxHeight: '400px',
                minHeight: '100px',
              }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  <span className="inline-block w-8 text-right opacity-50 select-none mr-4">
                    {i + 1}
                  </span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
            {!readOnly && (
              <textarea
                value={code}
                onChange={handleCodeChange}
                className="absolute top-0 left-0 w-full h-full opacity-0 resize-none outline-none font-mono p-4"
                spellCheck="false"
                aria-label="Code editor"
              />
            )}
          </div>
        )}
      </Highlight>
      {!readOnly && (
        <div className="bg-gray-100 p-2 text-xs text-gray-500">
          You can edit this code directly
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
