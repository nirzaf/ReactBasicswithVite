import React, { useState } from 'react';

type CodeEditorProps = {
  initialCode: string;
  readOnly?: boolean;
  onChange?: (code: string) => void;
  language?: string;
  fileName?: string;
};

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  initialCode, 
  readOnly = false,
  onChange,
  language = 'typescript',
  fileName = 'example.tsx'
}) => {
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    if (onChange) {
      onChange(newCode);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm mb-6" id="examples">
      {/* Header bar - Angular style */}
      <div className="bg-[#f5f5f5] border-b border-gray-200 px-4 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-medium text-gray-500">{fileName}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-[#e3f2fd] text-[#1976d2]">{language}</span>
        </div>
        <div className="flex items-center space-x-2">
          {!readOnly && <span className="text-xs text-[#1976d2]">Editable</span>}
          <button 
            onClick={copyToClipboard}
            className="text-gray-500 hover:text-[#1976d2] focus:outline-none"
            title="Copy code"
          >
            {copied ? (
              <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Code area - Angular style */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-10 bg-[#fafafa] border-r border-gray-200 flex flex-col items-center pt-4 text-xs text-gray-400">
          {initialCode.split('\n').map((_, i) => (
            <div key={i} className="w-full text-center py-0.5">{i + 1}</div>
          ))}
        </div>
        <textarea
          value={code}
          onChange={handleChange}
          readOnly={readOnly}
          className="w-full font-mono text-sm py-4 pl-12 pr-4 bg-white text-gray-800 min-h-[200px] focus:outline-none focus:ring-1 focus:ring-[#1976d2] focus:border-[#1976d2]"
          spellCheck="false"
          style={{ lineHeight: '1.5' }}
        />
      </div>
      
      {/* Footer - Angular style */}
      <div className="bg-[#f5f5f5] border-t border-gray-200 px-4 py-2 text-xs text-gray-500 flex justify-between">
        <span>Try it in your project</span>
        <a href="https://stackblitz.com" target="_blank" rel="noopener noreferrer" className="text-[#1976d2] hover:underline">Open in StackBlitz</a>
      </div>
    </div>
  );
};

export default CodeEditor;
