export type Todo = {
  id: string;
  content: string | null;
  done: boolean | null;
  priority: "low" | "medium" | "high" | null;
  owner: string | null;
  createdAt: string;
  updatedAt: string;
};
