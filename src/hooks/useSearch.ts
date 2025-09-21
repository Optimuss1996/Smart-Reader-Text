import { useEffect, useRef, useState } from "react";
import { text } from "../constants/staticData";
import { getAllMatchedWords } from "../utils/getAllMatchedWords";

export function useSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWord, setSelectedWord] = useState("");
  const [previewWord, setPreviewWord] = useState("");
  const [matchedWords, setMatchedWords] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (searchTerm.trim()) {
      setMatchedWords(getAllMatchedWords(text, searchTerm));
    } else {
      setMatchedWords([]);
      setSelectedWord("");
      setPreviewWord("");
    }
    setActiveIndex(-1);
  }, [searchTerm]);

  useEffect(() => {
    if (listRef.current && activeIndex >= 0) {
      const item = listRef.current.children[activeIndex] as HTMLElement;
      if (item) {
        item.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [activeIndex]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => {
        const next = prev < matchedWords.length - 1 ? prev + 1 : prev;
        setPreviewWord(matchedWords[next] || "");
        return next;
      });
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => {
        const next = prev > 0 ? prev - 1 : -1;
        setPreviewWord(next >= 0 ? matchedWords[next] : "");
        return next;
      });
    } else if (e.key === "Enter" && activeIndex >= 0) {
      const word = matchedWords[activeIndex];
      setSelectedWord(word);
      setSearchTerm(word);
      setMatchedWords([]);
      setPreviewWord("");
    }
  };

  const handleClick = (word: string) => {
    setSelectedWord(word);
    setSearchTerm(word);
    setMatchedWords([]);
    setPreviewWord("");
  };

  return {
    searchTerm,
    setSearchTerm,
    matchedWords,
    selectedWord,
    previewWord,
    activeIndex,
    handleKeyDown,
    handleClick,
    listRef,
  };
}
