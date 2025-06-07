export type Todo = {
  readonly id: string;
  content: string | null;
  done: boolean | null;
  priority: "low" | "medium" | "high" | null;
  order: number | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  owner: string | null;
};
