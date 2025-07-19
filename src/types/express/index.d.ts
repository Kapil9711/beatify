// express.d.ts or src/types/express/index.d.ts // adjust the path to your User model

import { IUser } from "../schemaTypes";

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // or whatever your user type is
    }
  }
}