import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "must provide username"],
  },
  password: {
    type: String,
    required: [true, "must provide password"],
  },
});

const User = model("User", UserSchema);

export default User;
