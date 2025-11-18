import { Outlet, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { Bell, Settings } from "lucide-react";
import { useScroll } from "@/hooks/use-scroll";
import { NavButton } from "@/components/nav-button";
import { layoutClasses } from "./layout.constant";

function Layout() {
  const navigate = useNavigate();
  const topBarActive = useScroll();

  const handleNavigation = (path: string) => () => {
    navigate(path);
  };

  const containerClasses = clsx(
    layoutClasses?.base,
    layoutClasses?.overlay?.base,
    topBarActive
      ? [layoutClasses?.background?.scrolled, layoutClasses?.overlay?.hidden]
      : [layoutClasses?.background?.default, layoutClasses?.overlay?.visible]
  );

  return (
    <div className={containerClasses}>
      {/* Top bar */}
      <header className="fixed inset-x-0 top-0 z-50 mt-1 h-[65px] px-3.5">
        <div
          className={clsx(
            "top-bar group relative mx-5 h-full",
            topBarActive && "top-bar--active"
          )}
        >
          <div
            className={clsx(
              "container box flex h-full w-full items-center",
              "bg-transparent border-transparent shadow-none",
              "transition-[padding,background-color,border-color] duration-300 ease-in-out",
              topBarActive && "px-5 bg-gradient-to-r from-theme-1 to-theme-2"
            )}
          >
            <div className="text-white font-medium">News Aggregator</div>

            <div className="flex flex-1 items-center">
              <div className="ml-auto flex items-center gap-1">
                <NavButton
                  icon={Bell}
                  label="Home"
                  onClick={handleNavigation("/")}
                />
                <NavButton
                  icon={Settings}
                  label="Configuration"
                  onClick={handleNavigation("/configuration")}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 pt-[54px] pb-16 xl:pl-3.5">
        <div className="mt-16 px-5">
          <div className="container">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Layout;
