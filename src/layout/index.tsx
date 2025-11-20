import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";
import { Home, Settings, Newspaper } from "lucide-react";
import { useEventListener } from "usehooks-ts";
import { Button } from "@/components/ui";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import { layoutClasses } from "./layout.constant";

export function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [topBarActive, setTopBarActive] = useState(false);

  // Listen to scroll events
  useEventListener("scroll", () => {
    setTopBarActive(window.scrollY > 0);
  });

  const handleNavigation = (path: string) => () => {
    navigate(path);
  };

  const isActive = (path: string) => location.pathname === path;

  const containerClasses = clsx(
    layoutClasses?.base,
    layoutClasses?.overlay?.base,
    topBarActive
      ? [layoutClasses?.background?.scrolled, layoutClasses?.overlay?.hidden]
      : [layoutClasses?.background?.default, layoutClasses?.overlay?.visible]
  );

  return (
    <div className={containerClasses}>
      {/* Top bar - Responsive header */}
      <header className="fixed inset-x-0 top-0 z-50 mt-1 h-[65px] sm:h-[70px] px-2 sm:px-3.5">
        <div
          className={clsx(
            "top-bar group relative mx-2 sm:mx-5 h-full",
            topBarActive && "top-bar--active"
          )}
        >
          <div
            className={clsx(
              "container box flex h-full w-full items-center justify-between",
              "bg-transparent border-transparent shadow-none",
              "transition-[padding,background-color,border-color] duration-300 ease-in-out",
              "px-3 sm:px-4 md:px-5",
              topBarActive && "bg-gradient-to-r from-theme-1 to-theme-2"
            )}
          >
            {/* Logo/Brand - Responsive sizing */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <Newspaper className="h-5 w-5 sm:h-6 sm:w-6 text-white flex-shrink-0" />
              <div className="flex flex-col min-w-0">
                <div className="text-white font-semibold text-base sm:text-lg leading-tight truncate">
                  News Aggregator
                </div>
              </div>
            </div>

            {/* Navigation - Responsive button sizing */}
            <div className="flex flex-1 items-center justify-end ml-2 sm:ml-4">
              <nav className="flex items-center gap-1.5 sm:gap-2">
                <Button
                  size="sm"
                  rounded
                  onClick={handleNavigation("/")}
                  className={clsx(
                    "flex items-center gap-1.5 sm:gap-2 transition-all duration-200",
                    "px-2 sm:px-3",
                    isActive("/")
                      ? "bg-white/25 text-white border-white/40 shadow-md hover:bg-white/35 hover:shadow-lg"
                      : "bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/30"
                  )}
                >
                  <Home className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span className="font-medium text-xs sm:text-sm hidden sm:inline">
                    Home
                  </span>
                </Button>
                <Button
                  size="sm"
                  rounded
                  onClick={handleNavigation("/settings")}
                  className={clsx(
                    "flex items-center gap-1.5 sm:gap-2 transition-all duration-200",
                    "px-2 sm:px-3",
                    isActive("/settings")
                      ? "bg-gradient-to-r from-amber-500/90 to-orange-500/90 text-white border-amber-400/50 shadow-md hover:from-amber-500 hover:to-orange-500 hover:shadow-lg"
                      : "bg-gradient-to-r from-amber-500/70 to-orange-500/70 text-white border-amber-400/40 hover:from-amber-500/80 hover:to-orange-500/80 hover:border-amber-400/50 shadow-sm hover:shadow-md"
                  )}
                >
                  <Settings className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span className="font-medium text-xs sm:text-sm hidden sm:inline">
                    Settings
                  </span>
                </Button>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main content - Responsive padding */}
      <main className="relative z-10 pt-[54px] sm:pt-[60px] pb-20 sm:pb-24 md:pb-16 xl:pl-3.5 min-h-screen">
        <div className="mt-12 sm:mt-14 md:mt-16 px-3 sm:px-4 md:px-5">
          <div className="container mx-auto max-w-7xl">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Scroll to top button */}
      <ScrollToTopButton />
    </div>
  );
}
