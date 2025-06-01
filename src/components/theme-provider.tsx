"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Wraps the Next.js ThemeProvider to centralize theme config.
 *
 * @param children - The components to render within the theme context
 * @param props - Additional props passed to NextThemesProvider
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
