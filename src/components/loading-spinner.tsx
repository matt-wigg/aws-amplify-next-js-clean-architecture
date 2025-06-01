"use client";

/**
 * A simple animated loading spinner.
 *
 * @param size - Tailwind size classes (e.g. "h-4 w-4", "h-6 w-6")
 */
export function LoadingSpinner({ size = "h-4 w-4" }: { size?: string }) {
  return (
    <span
      className={`inline-block animate-spin rounded-full ${size} border-2 border-t-transparent`}
      role="status"
      aria-label="Loading"
    />
  );
}
