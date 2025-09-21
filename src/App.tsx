import { text } from "./constants/staticData";
import { useSearch } from "./hooks/useSearch";
import SearchInput from "./components/SearchInput";
import SuggestionsList from "./components/SuggestionList";
import HighlightedText from "./components/HighlightedText";

export default function App() {
  const {
    searchTerm,
    setSearchTerm,
    matchedWords,
    selectedWord,
    previewWord,
    activeIndex,
    handleClick,
    handleKeyDown,
    listRef,
  } = useSearch();

  return (
    <div className="min-h-screen max-w-2xl mx-auto py-10 px-6">
      {/*  --------------------Header------------------------- */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-6 text-center tracking-tight">
        Smart Search <span className="text-blue-500">Reader</span>
      </h1>

      {/*  --------------------inputSearch------------------------- */}
      <SearchInput
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleKeyDown={handleKeyDown}
      />

      {/*  --------------------SuggestionsList------------------------- */}

      {matchedWords.length > 0 && (
        <SuggestionsList
          matchedWords={matchedWords}
          activeIndex={activeIndex}
          onItemClick={handleClick}
          listRef={listRef}
        />
      )}

      {/*  --------------------HighlightedText------------------------- */}

      <HighlightedText text={text} highlight={previewWord || selectedWord} />
    </div>
  );
}
