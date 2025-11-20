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
 * Get the Tailwind CSS gradient class for a news source
 * Uses theme colors that match the application palette
 * Theme palette: theme-1 (#4c956c - green), theme-2 (#006466 - teal), primary, success (teal), info (cyan)
 * @param source - The news source enum value
 * @returns The gradient background class for the source chip and text
 */
export const getSourceGradient = (source: ENewsSource): string => {
  switch (source) {
    case ENewsSource.NewsAPI:
      // Using info (cyan) gradient - matches theme info color
      return "bg-gradient-to-r from-cyan-500 to-cyan-600";
    case ENewsSource.Guardian:
      // Using primary theme gradient (theme-1 to theme-2) - beautiful green to teal, user's favorite
      return "bg-gradient-to-r from-theme-1 to-theme-2";
    case ENewsSource.Nyt:
      // Using teal gradient - complements the theme palette
      return "bg-gradient-to-r from-teal-500 to-teal-600";
    default:
      return "bg-gradient-to-r from-theme-1 to-theme-2";
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
