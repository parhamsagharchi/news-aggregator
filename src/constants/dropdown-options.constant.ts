import { ENewsSource } from "@/store/store.enum";

/**
 * Categories options for the filter dropdown
 */
export const NEWS_CATEGORIES = [
  { value: "business", label: "Business" },
  { value: "technology", label: "Technology" },
  { value: "science", label: "Science" },
  { value: "health", label: "Health" },
  { value: "sports", label: "Sports" },
  { value: "entertainment", label: "Entertainment" },
  { value: "general", label: "General" },
  { value: "politics", label: "Politics" },
  { value: "world", label: "World" },
  { value: "culture", label: "Culture" },
] as const;

/**
 * Popular news authors/journalists
 */
export const POPULAR_AUTHORS = [
  { value: "David Leonhardt", label: "David Leonhardt" },
  { value: "Thomas L. Friedman", label: "Thomas L. Friedman" },
  { value: "Maureen Dowd", label: "Maureen Dowd" },
  { value: "Paul Krugman", label: "Paul Krugman" },
  { value: "Nicholas Kristof", label: "Nicholas Kristof" },
  { value: "David Brooks", label: "David Brooks" },
  { value: "Gail Collins", label: "Gail Collins" },
  { value: "Frank Bruni", label: "Frank Bruni" },
  { value: "Bret Stephens", label: "Bret Stephens" },
  { value: "Charles M. Blow", label: "Charles M. Blow" },
  { value: "Jamelle Bouie", label: "Jamelle Bouie" },
  { value: "Michelle Goldberg", label: "Michelle Goldberg" },
  { value: "Ross Douthat", label: "Ross Douthat" },
  { value: "Ezra Klein", label: "Ezra Klein" },
  { value: "Jennifer Senior", label: "Jennifer Senior" },
  { value: "Tressie McMillan Cottom", label: "Tressie McMillan Cottom" },
  { value: "Lydia Polgreen", label: "Lydia Polgreen" },
  { value: "Zeynep Tufekci", label: "Zeynep Tufekci" },
  { value: "Farhad Manjoo", label: "Farhad Manjoo" },
  { value: "Verge Staff", label: "Verge Staff" },
  { value: "Julian Chokkattu", label: "Julian Chokkattu" },
  { value: "Ece Yildirim", label: "Ece Yildirim" },
  { value: "Lucas Ropek", label: "Lucas Ropek" },
  { value: "Dan DeFrancesco", label: "Dan DeFrancesco" },
  { value: "Taylor Rains", label: "Taylor Rains" },
  { value: "Brent D. Griffiths", label: "Brent D. Griffiths" },
  { value: "Cheryl Eddy", label: "Cheryl Eddy" },
  { value: "Conor King Devitt", label: "Conor King Devitt" },
  { value: "Joe Rossignol", label: "Joe Rossignol" },
  { value: "Nilay Patel", label: "Nilay Patel" },
  { value: "Emma Roth", label: "Emma Roth" },
  { value: "Stevie Bonifield", label: "Stevie Bonifield" },
  { value: "Charles Pulliam-Moore", label: "Charles Pulliam-Moore" },
] as const;

/**
 * Source options for the filter dropdown
 */
export const SOURCE_OPTIONS = [
  { value: ENewsSource.NewsAPI, label: "NewsAPI" },
  { value: ENewsSource.Guardian, label: "The Guardian" },
  { value: ENewsSource.Nyt, label: "New York Times" },
] as const;
