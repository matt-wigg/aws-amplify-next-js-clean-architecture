export type ActionState =
  | { error: string; success?: undefined }
  | { success: true; error?: undefined };
