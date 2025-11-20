import { useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui";
import { useEventListener } from "usehooks-ts";

/**
 * ScrollToTopButton
 *
 * A floating button that appears when user scrolls down
 * and scrolls to top when clicked
 */
export function ScrollToTopButton() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Listen to scroll events
  useEventListener("scroll", () => {
    setIsScrolled(window.scrollY > 300);
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isScrolled) {
    return null;
  }

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 p-0 shadow-lg"
      variant="primary"
      rounded
      elevated
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5" />
    </Button>
  );
}
