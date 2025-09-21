import React from "react";

interface InputProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputSearch: React.FC<InputProps> = ({
  searchTerm,
  setSearchTerm,
  handleKeyDown,
}) => {
  return (
    <input
      type="text"
      placeholder="Search in the text..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyDown={handleKeyDown}
      className="w-full px-4 py-3 mb-4 text-sm text-gray-800 placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-150"
    />
  );
};

export default InputSearch;
