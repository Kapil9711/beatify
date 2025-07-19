import { Request } from "express";
import { IUser } from "../schemaTypes";

export interface ExtendedRequest extends Request {
    user:IUser
}