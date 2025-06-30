import { z } from "zod";
import { userSchema } from "./zodSchema";

// ✅ TypeScript type automatically from Zod schema
export type UserInput = z.infer<typeof userSchema>;
