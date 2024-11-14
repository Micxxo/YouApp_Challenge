import * as z from "zod";

export const loginSchema = z.object({
  keyword: z
    .string()
    .min(1, "Email or Username Must be Filled!")
    .refine(
      (val) => {
        if (val.includes("@")) {
          return z.string().email().safeParse(val).success;
        } else {
          return /^[a-zA-Z0-9]{6,}$/.test(val);
        }
      },
      {
        message:
          "Invalid email or username. If using a username, it must be at least 6 alphanumeric characters.",
      }
    ),
  password: z.string().min(6, "Password must contain 6 characters"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
