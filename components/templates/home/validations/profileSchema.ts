import { z } from "zod";

export const profileSchema = z.object({
  profile: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File size must be less than 5MB.",
    })
    .refine((file) => file && file.size > 0, {
      message: "File must not be empty.",
    }),
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
  height: z.string().min(1, "Height must be at least 1 cm."),
  weight: z.string().min(1, "Weight must be at least 1 kg."),
  horoscope: z
    .string()
    .min(1, "Horoscope must be at least 1 alphanumeric characters."),
  zodiac: z
    .string()
    .min(1, "zodiac must be at least 1 alphanumeric characters."),
});
