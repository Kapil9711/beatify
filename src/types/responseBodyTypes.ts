import { z } from "zod";
import { loginUserSchema, userSchema } from "./zodSchema";

// ✅ TypeScript type automatically from Zod schema
export type UserInput = z.infer<typeof userSchema>;
export type UserLoginInput = z.infer<typeof loginUserSchema>;
