"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="border-b border-b-transparent hover:border-b-foreground duration-100 cursor-pointer"
    >
      {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
};
