import { Link } from "react-router-dom";
import type { INewsCard } from "./news-card.types";
import {
  getSourceName,
  getSourceColor,
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
}: INewsCard) {
  const sourceName = getSourceName(source);
  const sourceColor = getSourceColor(source);
  const formattedDate = formatDate(date);
  const truncatedDescription = truncateText(description ?? "", 30);
  const hasImage = imageUrl != null && imageUrl.trim() !== "";

  return (
    <Link
      to={url}
      target="_blank"
      rel="noopener noreferrer"
      className="p-5 box box--stacked cursor-pointer hover:shadow-lg transition-shadow h-full flex flex-col block"
    >
      <div className="h-48 overflow-hidden rounded-lg image-fit before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-gradient-to-t before:from-theme-1/60 before:to-theme-2/5 relative flex items-center justify-center">
        {hasImage ? (
          <img
            alt={title}
            className="rounded-md saturate-150 w-full h-full object-cover"
            src={imageUrl ?? undefined}
          />
        ) : (
          <div className="text-white text-2xl font-bold z-20 relative">
            {sourceName}
          </div>
        )}
      </div>
      <div className="mt-5 flex items-center gap-2">
        <span
          className={`${sourceColor} text-white text-xs font-medium px-2 py-1 rounded-full`}
        >
          {sourceName}
        </span>
        <span className="text-slate-500 text-sm">{formattedDate}</span>
      </div>
      <div className="mt-2 text-base font-medium min-h-[3rem]">{title}</div>
      <div className="mt-2 leading-relaxed text-slate-600 flex-grow min-h-[4.5rem]">
        {truncatedDescription}
      </div>
    </Link>
  );
}
