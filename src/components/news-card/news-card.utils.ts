import { ENewsSource } from "@/store/store.enum";

/**
 * Get the display name for a news source
 * @param source - The news source enum value
 * @returns The formatted display name for the source
 */
export const getSourceName = (source: ENewsSource): string => {
  switch (source) {
    case ENewsSource.NewsAPI:
      return "The News API";
    case ENewsSource.Guardian:
      return "The Guardian";
    case ENewsSource.Nyt:
      return "The New York Times";
    default:
      return "The News API";
  }
};

/**
 * Get the Tailwind CSS color class for a news source
 * @param source - The news source enum value
 * @returns The background color class for the source chip
 */
export const getSourceColor = (source: ENewsSource): string => {
  switch (source) {
    case ENewsSource.NewsAPI:
      return "bg-blue-500";
    case ENewsSource.Guardian:
      return "bg-green-500";
    case ENewsSource.Nyt:
      return "bg-red-500";
    default:
      return "bg-blue-500";
  }
};

/**
 * Format a date string to a human-readable format
 * @param dateString - The date string to format (ISO format or similar)
 * @returns Formatted date string (e.g., "January 15, 2024") or original string if parsing fails
 */
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date?.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
};

/**
 * Truncate text to a specified word count
 * @param text - The text to truncate
 * @param wordCount - Maximum number of words to keep (default: 30)
 * @returns Truncated text with "..." appended if truncated, or original text if within limit
 */
export const truncateText = (text: string, wordCount: number = 30): string => {
  const words = text?.split(" ");
  if (words?.length <= wordCount) return text;
  return words?.slice(0, wordCount).join(" ") + " ...";
};
