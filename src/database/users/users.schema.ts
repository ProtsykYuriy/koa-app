import { Schema } from "mongoose";
const UserSchema = new Schema({
  name: String,
//   lastName: String,
//   age: Number,
//   dateOfEntry: {
//     type: Date,
//     default: new Date()
//   },
//   lastUpdated: {
//     type: Date,
//     default: new Date()
//   }
});
export default UserSchema;