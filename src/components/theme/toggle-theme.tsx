"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

/**
 * Button component to toggle between light and dark themes.
 * Handles hydration safely using `mounted` state.
 */
export function ToggleTheme() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        disabled
        className="h-10 w-10 rounded-full bg-muted animate-pulse"
        aria-label="Toggle theme loading"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="h-10 w-10 flex items-center justify-center rounded-full transition-colors text-muted-foreground hover:bg-accent cursor-pointer"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
