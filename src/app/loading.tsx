import { LoadingSpinner } from "@/components/loading-spinner";

/**
 * Fallback loading UI for suspenseful pages or routes.
 */
export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-muted-foreground">
      <LoadingSpinner size="h-16 w-16" />
      <p className="mt-4 text-sm">Loading, please wait...</p>
    </div>
  );
}
