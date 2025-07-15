import { z } from "zod";
import msg from "@/locales/en/auth/auth.json";

export const loginSchema = z.object({
  email: z.string().email(msg.schema.required.email),
  password: z.string().min(8, msg.schema.required.loginPassword),
});

export type LoginSchema = z.infer<typeof loginSchema>;
