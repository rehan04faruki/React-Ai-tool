import React, { useEffect, useState } from "react";
import { checkHeading, replaceHeadingStars } from "../helper";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";

const Answers = ({ ans, index, totalResult }) => {
  const [heading, setHeading] = useState(false);
  const [answer, setAnswer] = useState(ans);

  useEffect(() => {
    if (checkHeading(ans)) {
      setHeading(true);
      setAnswer(replaceHeadingStars(ans));
    }
  }, [ans]);

  const renderers = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          {...props}
          style={dark}
          language={match[1]}
          PreTag="div"
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code {...props} className={className}>
          {children}
        </code>
      );
    },
  };

  return (
    <div className="p-2 text-left">
      {index === 0 && totalResult > 1 ? (
        <span className="pt-2 block text-xl text-white">{answer}</span>
      ) : heading ? (
        <span className="pt-2 block text-lg text-white">{answer}</span>
      ) : (
        <span className="pl-5">
          <ReactMarkdown components={renderers}>{answer}</ReactMarkdown>
        </span>
      )}
    </div>
  );
};

export default Answers;
