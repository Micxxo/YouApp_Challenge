import * as z from "zod";

export const registerSchema = z
  .object({
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
    username: z
      .string()
      .min(6, "Username must be at least 6 alphanumeric characters")
      .regex(
        /^[a-zA-Z0-9]{6,}$/,
        "Username must be alphanumeric and at least 6 characters"
      ),
    password: z.string().min(6, "Password must contain at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must contain at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type registerSchema = z.infer<typeof registerSchema>;
