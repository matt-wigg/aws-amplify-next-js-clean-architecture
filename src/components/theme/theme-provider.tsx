"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Provides theme context to the client application using `next-themes`.
 *
 * Applies system preference by default and disables transition flashes on theme change.
 *
 * @param children - The component subtree to apply the theme to.
 * @param props - Additional props forwarded to NextThemesProvider.
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
