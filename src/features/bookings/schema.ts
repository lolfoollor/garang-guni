import { z } from "zod";
import msg from "@/locales/en/bookings/bookingSchema.json";

export const bookingSchema = z.object({
  date: z.string().min(1, msg.schema.required.date),
  address: z.string().min(1, msg.schema.required.address),
  preferredTiming: z.string().min(1, msg.schema.required.preferredTiming),
  categories: z.array(z.string()).optional(),
  images: z.array(z.any()).optional(),
  remarks: z.string().optional(),
});

export type BookingSchema = z.infer<typeof bookingSchema>;
