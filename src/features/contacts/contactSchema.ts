import { z } from "zod";
import msg from "@/locales/en/contacts/contacts.json";

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, { message: msg.contactForm.validation.name.required })
    .max(60, { message: msg.contactForm.validation.name.max })
    .regex(/^[\p{L}\p{M}\s'-]+$/u, {
      message: msg.contactForm.validation.name.regex,
    }),
  email: z.string().email({ message: msg.contactForm.validation.email.format }),
  subject: z
    .string()
    .min(1, { message: msg.contactForm.validation.subject.required })
    .max(100, { message: msg.contactForm.validation.subject.max }),
  messageBody: z
    .string()
    .min(1, { message: msg.contactForm.validation.messageBody.required })
    .max(500, { message: msg.contactForm.validation.messageBody.max }),
});

export type ContactSchema = z.infer<typeof contactSchema>;
