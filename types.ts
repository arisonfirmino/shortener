export type CreateUserResponse =
  | { success: true }
  | { success: false; type: "email" | "username" | "password"; error: string };

export type ActionResponse =
  | { success: true }
  | {
      success: false;
      type: "unauthorized" | "not_found" | "conflict" | "validation";
      error: string;
    };
