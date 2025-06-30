import { z } from "zod";

export const userSchema = z.object({
  userName: z.string().min(1, "Username is Required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password Should have at least 8 characters"),
  profileImage: z.string().optional(),
});

export const loginUserSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password Should have at least 8 characters"),
});
