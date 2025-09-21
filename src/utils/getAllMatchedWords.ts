import { escapeRegExp } from "./escapeRegex";

// استخراج کلمات پیشنهادی
export const getAllMatchedWords = (text: string, search: string) => {
  const escaped = escapeRegExp(search.trim());
  if (!escaped) return [];
  const regex = new RegExp(`\\b${escaped}\\w*\\b`, "gi");
  const matches = text.match(regex) || [];
  return [...new Set(matches)];
};
