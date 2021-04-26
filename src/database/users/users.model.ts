import { model } from "mongoose";
import { User } from "./users.types";
import UserSchema from "./users.schema";
// export const UserModel = model<User>("user", UserSchema);
export const UserModel = model("user", UserSchema);