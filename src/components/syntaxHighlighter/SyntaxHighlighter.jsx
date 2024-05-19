import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
export default function Highlighter({ language, code }) {
  return (
    <SyntaxHighlighter
      showLineNumbers
      wrapLongLines
      className="border-[20px] rounded-md shadow mt-4 border-[#f8f8ff]"
      language={language}
      style={docco}
    >
      {code}
    </SyntaxHighlighter>
  );
}
