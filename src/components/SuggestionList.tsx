import React from "react";

interface SuggestionsListProps {
  matchedWords: string[];
  activeIndex: number;
  onItemClick: (word: string) => void;
  listRef: React.RefObject<HTMLUListElement | null>;
}

const SuggestionsList: React.FC<SuggestionsListProps> = ({
  matchedWords,
  activeIndex,
  onItemClick,
  listRef,
}) => {
  return (
    <ul
      ref={listRef}
      className="bg-white border border-gray-200 rounded-lg shadow-sm mb-4 max-h-48 overflow-y-auto"
    >
      {matchedWords.map((word, index) => (
        <li
          key={index}
          onClick={() => onItemClick(word)}
          className={`px-4 py-2 transition-all duration-150 ease-in-out cursor-pointer flex items-center justify-between text-sm font-medium 
            ${
              index === activeIndex
                ? "bg-blue-50 text-blue-600 border-l-4 border-blue-400"
                : "hover:bg-gray-100 text-gray-700"
            }`}
        >
          {word}
        </li>
      ))}
    </ul>
  );
};

export default SuggestionsList;
