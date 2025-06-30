import { z } from "zod";

export const userSchema = z.object({
  userName: z.string().min(1, "Username is Required"),
  email: z.string().email(),
  password: z.string().min(8, "Password Should have at least 8 characters"),
  profileImage: z.string().optional(),
});
