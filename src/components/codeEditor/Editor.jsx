import React from "react";
import Editor from "react-simple-code-editor";
import { Highlight, themes } from "prism-react-renderer";

const CodeEditor = ({ content, setContent }) => {
  const handleValueChange = (newContent) => {
    setContent(newContent);
  };

  const highlightCode = (code) => (
    <Highlight theme={themes.nightOwl} code={code} language="javascript">
      {({ tokens, getLineProps, getTokenProps }) => (
        <pre>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );

  return (
    <Editor
      value={content}
      onValueChange={handleValueChange}
      highlight={highlightCode}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
        backgroundColor: themes.nightOwl.plain.backgroundColor,
        color: themes.nightOwl.plain.color,
      }}
    />
  );
};

export default CodeEditor;
