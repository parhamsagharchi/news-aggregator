import type { ComponentType } from "react";

interface NavButtonProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
}

/**
 * Reusable navigation button component
 * Follows DRY and Single Responsibility principles
 */
export function NavButton({ icon: Icon, label, onClick }: NavButtonProps) {
  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-full px-3 py-2 text-white hover:bg-white/10 transition-colors"
      onClick={onClick}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

