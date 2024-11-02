'use client';

import { useState, useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/tokyo-night-dark.css';

// Register commonly used languages
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import python from 'highlight.js/lib/languages/python';
import java from 'highlight.js/lib/languages/java';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml'; // For HTML
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';

// Register the languages
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('java', java);
hljs.registerLanguage('css', css);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('json', json);

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
