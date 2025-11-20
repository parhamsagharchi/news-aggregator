import type { IArticle } from "@/types/article.types";

/**
 * Filter articles by keyword (searches in title and description)
 * @param articles - Array of articles
 * @param keyword - Search keyword
 * @returns Filtered articles
 */
export function filterArticlesByKeyword(
  articles: IArticle[],
  keyword: string
): IArticle[] {
  if (!keyword.trim()) {
    return articles;
  }

  const keywordLower = keyword.toLowerCase();
  return articles.filter(
    (article) =>
      article.title.toLowerCase().includes(keywordLower) ||
      article.description.toLowerCase().includes(keywordLower)
  );
}

/**
 * Filter articles by date range
 * @param articles - Array of articles
 * @param startDate - Start date (YYYY-MM-DD)
 * @param endDate - End date (YYYY-MM-DD)
 * @returns Filtered articles
 */
export function filterArticlesByDateRange(
  articles: IArticle[],
  startDate?: string,
  endDate?: string
): IArticle[] {
  if (!startDate && !endDate) {
    return articles;
  }

  return articles.filter((article) => {
    const articleDate = new Date(article.publishedAt);
    
    if (startDate && articleDate < new Date(startDate)) {
      return false;
    }
    
    if (endDate) {
      const endDateObj = new Date(endDate);
      endDateObj.setHours(23, 59, 59, 999); // Include entire end date
      if (articleDate > endDateObj) {
        return false;
      }
    }
    
    return true;
  });
}

/**
 * Filter articles by author name(s)
 * @param articles - Array of articles
 * @param authors - Author name(s) to filter by (string or array)
 * @returns Filtered articles
 */
export function filterArticlesByAuthor(
  articles: IArticle[],
  authors: string | string[]
): IArticle[] {
  const authorArray = Array.isArray(authors) ? authors : [authors];
  
  if (authorArray.length === 0 || authorArray.every((a) => !a.trim())) {
    return articles;
  }

  const authorLowerArray = authorArray
    .filter((a) => a.trim())
    .map((a) => a.toLowerCase());

  return articles.filter((article) => {
    if (!article.author) return false;
    const articleAuthorLower = article.author.toLowerCase();
    // Match if article author includes any of the selected authors
    return authorLowerArray.some((authorLower) =>
      articleAuthorLower.includes(authorLower)
    );
  });
}

/**
 * Filter articles by keyword, date range, and author(s)
 * @param articles - Array of articles
 * @param keyword - Search keyword
 * @param startDate - Start date (YYYY-MM-DD)
 * @param endDate - End date (YYYY-MM-DD)
 * @param authors - Author name(s) to filter by (string or array)
 * @returns Filtered articles
 */
export function filterArticles(
  articles: IArticle[],
  keyword?: string,
  startDate?: string,
  endDate?: string,
  authors?: string | string[]
): IArticle[] {
  let filtered = articles;
  
  if (keyword) {
    filtered = filterArticlesByKeyword(filtered, keyword);
  }
  
  if (startDate || endDate) {
    filtered = filterArticlesByDateRange(filtered, startDate, endDate);
  }

  if (authors) {
    const authorArray = Array.isArray(authors) ? authors : [authors];
    if (authorArray.length > 0 && authorArray.some((a) => a.trim())) {
      filtered = filterArticlesByAuthor(filtered, authors);
    }
  }
  
  return filtered;
}

