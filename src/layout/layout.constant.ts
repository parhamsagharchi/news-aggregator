export const layoutClasses = {
  base: "echo background relative min-h-screen transition-colors duration-500 ease-in-out",
  overlay: {
    base: "before:content-[''] before:fixed before:top-0 before:h-[370px] before:w-screen before:bg-gradient-to-t before:from-theme-1/80 before:to-theme-2 before:transition-all before:duration-500 before:ease-in-out",
    visible: "before:opacity-100 before:translate-y-0",
    hidden: "before:opacity-0 before:translate-y-[-100%]",
  },
  background: {
    default: "bg-gradient-to-b from-slate-200/70 to-slate-50",
    scrolled: "bg-slate-100 background--hidden",
  },
} as const;
