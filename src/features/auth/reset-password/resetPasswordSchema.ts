import { z } from "zod";
import msg from "@/locales/en/auth/auth.json";

export const resetPasswordSchema = z.object({
  email: z.string().email(msg.schema.required.email),
});

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
