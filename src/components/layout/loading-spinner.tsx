/**
 * A minimal animated loading spinner.
 *
 * @param size - Optional Tailwind size classes (default: "h-4 w-4").
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
