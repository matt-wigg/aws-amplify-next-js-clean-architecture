import { LoadingSpinner } from "@nextjs/components/layout/loading-spinner";

/**
 * Fallback loading UI for suspenseful pages or routes.
 */
export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
      <LoadingSpinner size="h-16 w-16" />
      <p className="mt-4 text-sm">Loading, please wait...</p>
    </div>
  );
}
