import { z } from "zod";

export const profileSchema = z.object({
  profile: z.string().min(1, "Profile Picture is required."),
  name: z
    .string()
    .min(8, "Display name must be at least 8 alphanumeric characters."),
  gender: z
    .string()
    .nonempty({ message: "Gender is required." })
    .refine((value) => ["male", "female"].includes(value), {
      message: "Invalid gender selection.",
    }),
  birthday: z
    .date()
    .refine((value) => !isNaN(value.getTime()), {
      message: "Invalid date format.",
    })
    .refine((value) => value <= new Date(), {
      message: "Birthday must be in the past.",
    }),
  height: z.number().min(1, "Height must be at least 1 cm."),
  weight: z.number().min(1, "Weight must be at least 1 kg."),
  horoscope: z.string(),
  zodiac: z.string(),
});
