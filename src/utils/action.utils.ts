"use server";

import { revalidatePath } from "next/cache";
import { ROUTES } from "@nextjs/constants/routes.constants";

/**
 * Revalidates paths relevant to todo actions.
 */
export async function revalidateTodoPaths() {
  revalidatePath(ROUTES.INTERNAL.HOME);
  revalidatePath(ROUTES.INTERNAL.DRAGGABLE);
}
