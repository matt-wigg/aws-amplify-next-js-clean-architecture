import { ToggleTheme } from "@nextjs/components/theme/toggle-theme";

/**
 * Application footer with theme toggle control.
 */
export function Footer() {
  return (
    <footer className="border-t border-border py-4 text-muted-foreground bg-background">
      <div className="max-w-screen-xl mx-auto px-4 flex justify-end">
        <ToggleTheme />
      </div>
    </footer>
  );
}
