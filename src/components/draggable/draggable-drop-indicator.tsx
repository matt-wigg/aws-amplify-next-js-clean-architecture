/**
 * Visual indicator for drag-and-drop target positioning.
 */
export function DraggableDropIndicator() {
  return (
    <div className="flex items-center justify-center py-1">
      <span className="w-2 h-2 rounded-full bg-blue-500 mr-1" />
      <div className="h-0.5 bg-blue-500 flex-1" />
    </div>
  );
}
