'use client';

import { useState, useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/tokyo-night-dark.css'; // You can choose different themes

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = '' }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState('');

  useEffect(() => {
    if (language) {
      const highlighted = hljs.highlight(code, { language }).value;
      setHighlightedCode(highlighted);
    } else {
      setHighlightedCode(code);
    }
  }, [code, language]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="code-block">
      <div className="code-header">
        {language && <span className="code-language">{language}</span>}
        <button onClick={copyToClipboard} className="copy-button">
          {isCopied ? '✓ Copied!' : 'Copy code'}
        </button>
      </div>
      <pre className="code-content">
        <code 
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
          className={language ? `language-${language}` : ''}
        />
      </pre>
    </div>
  );
}