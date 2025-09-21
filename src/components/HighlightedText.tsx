import React, { useEffect, useRef } from "react";
import { escapeRegExp } from "../utils/escapeRegex";
interface HighlightedTextProps {
  text: string;
  highlight: string;
}

const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  highlight,
}) => {
  const firstMarkRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      if (firstMarkRef.current) {
        firstMarkRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 100);
  }, [highlight]);

  if (!highlight.trim()) return <>{text}</>;

  const regex = new RegExp(escapeRegExp(highlight), "gi");
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let isFirst = true;

  for (const match of text.matchAll(regex)) {
    const start = match.index!;
    const end = start + match[0].length;

    if (start > lastIndex) {
      parts.push(<span key={lastIndex}>{text.slice(lastIndex, start)}</span>);
    }

    parts.push(
      <mark
        className="bg-blue-500 px-[2px] rounded-xs animate-pulse"
        key={start}
        ref={
          isFirst
            ? (el) => {
                firstMarkRef.current = el;
              }
            : undefined
        }
      >
        {text.slice(start, end)}
      </mark>
    );

    isFirst = false;
    lastIndex = end;
  }

  if (lastIndex < text.length) {
    parts.push(<span key={lastIndex}>{text.slice(lastIndex)}</span>);
  }

  return <>{parts}</>;
};

export default HighlightedText;
