import React, { useState } from 'react';

type CodeEditorProps = {
  initialCode: string;
  readOnly?: boolean;
  onChange?: (code: string) => void;
};

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  initialCode, 
  readOnly = false,
  onChange 
}) => {
  const [code, setCode] = useState(initialCode);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    if (onChange) {
      onChange(newCode);
    }
  };

  return (
    <div className="rounded-md overflow-hidden border border-gray-300">
      <div className="bg-gray-800 text-white text-xs px-4 py-2 flex justify-between items-center">
        <span>TypeScript / React</span>
        {!readOnly && <span className="text-green-400">Editable</span>}
      </div>
      <textarea
        value={code}
        onChange={handleChange}
        readOnly={readOnly}
        className="w-full font-mono text-sm p-4 bg-gray-900 text-gray-100 min-h-[200px] focus:outline-none"
        spellCheck="false"
      />
    </div>
  );
};

export default CodeEditor;
