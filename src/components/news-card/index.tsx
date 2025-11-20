import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Calendar, Newspaper } from "lucide-react";
import type { INewsCard } from "./news-card.types";
import {
  getSourceName,
  getSourceGradient,
  formatDate,
  truncateText,
} from "./news-card.utils";

export function NewsCard({
  title,
  description,
  date,
  url,
  imageUrl,
  source,
  author,
}: INewsCard) {
  const sourceName = getSourceName(source);
  const sourceGradient = getSourceGradient(source);
  const formattedDate = formatDate(date);
  const truncatedDescription = truncateText(description ?? "", 30);
  const hasImage = imageUrl != null && imageUrl.trim() !== "";
  
  // State to track if image failed to load
  const [imageError, setImageError] = useState(false);

  /**
   * Handle image load error
   * When image fails to load, show source name as fallback
   */
  const handleImageError = () => {
    setImageError(true);
  };

  // Determine what to show: image or fallback (source name)
  const showImage = hasImage && !imageError;
  const showFallback = !hasImage || imageError;

  return (
    <Link
      to={url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full p-4 sm:p-5 box box--stacked cursor-pointer hover:shadow-lg transition-shadow h-full flex flex-col"
    >
      <div className="h-48 overflow-hidden rounded-lg image-fit before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-gradient-to-t before:from-theme-1/60 before:to-theme-2/5 relative flex items-center justify-center">
        {showImage ? (
          <img
            alt={title}
            className="rounded-md saturate-150 w-full h-full object-cover"
            src={imageUrl ?? undefined}
            onError={handleImageError}
          />
        ) : null}
        {showFallback && (
          <div
            className={`${sourceGradient} text-white text-lg sm:text-xl font-semibold z-20 relative w-full h-full flex items-center justify-center rounded-lg`}
          >
            {sourceName}
          </div>
        )}
      </div>
      {/* Meta Information: Source, Author, Date - Three Rows */}
      <div className="mt-3 sm:mt-4 space-y-1">
        {/* Row 1: Source */}
        <div className="flex items-center gap-1.5 min-w-0">
          <Newspaper className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-slate-400 flex-shrink-0" />
          <span className="text-[9px] sm:text-[10px] text-slate-600 truncate min-w-0 flex-1">
          {sourceName}
        </span>
        </div>
        
        {/* Row 2: Author (if available) */}
        {author && (
          <div className="flex items-center gap-1.5 min-w-0">
            <User className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-slate-400 flex-shrink-0" />
            <span className="text-[9px] sm:text-[10px] text-slate-600 truncate min-w-0 flex-1">
              {author}
            </span>
          </div>
        )}
        
        {/* Row 3: Date */}
        <div className="flex items-center gap-1.5 min-w-0">
          <Calendar className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-slate-400 flex-shrink-0" />
          <span className="text-[9px] sm:text-[10px] text-slate-500 truncate min-w-0 flex-1">
            {formattedDate}
          </span>
        </div>
      </div>
      
      {/* Divider */}
      <div className="mt-2.5 sm:mt-3 mb-2 sm:mb-2.5 border-t border-slate-200"></div>
      
      {/* Title */}
      <div className="text-xs sm:text-sm font-semibold leading-tight sm:leading-snug min-h-[2rem] sm:min-h-[2.5rem] break-words text-slate-800 text-justify">
        {title}
      </div>
      
      {/* Description (Subtitle) */}
      <div className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs leading-relaxed text-slate-600 flex-grow min-h-[3rem] sm:min-h-[3.5rem] break-words text-justify">
        {truncatedDescription}
      </div>
    </Link>
  );
}
