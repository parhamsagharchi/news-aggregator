export const buttonStyles = {
  base: [
    "transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer",
    "focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none",
    "[&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90",
    "[&:not(button)]:text-center",
    "disabled:opacity-70 disabled:cursor-not-allowed",
  ],
  size: {
    sm: "text-xs py-1.5 px-2",
    lg: "text-lg py-1.5 px-4",
  },
  variant: {
    primary: "bg-primary border-primary text-white",
    secondary: [
      "bg-secondary/70 border-secondary/70 text-slate-500",
      "[&:hover:not(:disabled)]:bg-slate-100 [&:hover:not(:disabled)]:border-slate-100",
    ],
    "outline-primary":
      "border-primary text-primary [&:hover:not(:disabled)]:bg-primary/10",
    "outline-secondary": [
      "border-secondary text-slate-500",
      "[&:hover:not(:disabled)]:bg-secondary/20",
    ],
    "soft-primary": [
      "bg-primary border-primary bg-opacity-20 border-opacity-5 text-primary",
      "[&:hover:not(:disabled)]:bg-opacity-10 [&:hover:not(:disabled)]:border-opacity-10",
    ],
    "soft-secondary": [
      "bg-slate-300 border-secondary bg-opacity-20 text-slate-500",
      "[&:hover:not(:disabled)]:bg-opacity-10",
    ],
  },
} as const;
