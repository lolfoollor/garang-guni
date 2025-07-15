import { z } from "zod";
import msg from "@/locales/en/auth/auth.json";

export const registerSchema = z
  .object({
    username: z.string().min(1, msg.schema.required.username),
    email: z.string().email(msg.schema.required.email),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^*?`&])[A-Za-z\d@#$!%^*?`&]{8,}$/,
        msg.schema.required.registerPassword,
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: msg.schema.error.confirmPassword,
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
