import mongoose from "mongoose";

const LoginSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { minimize: false }
);

const loginModel = mongoose.model("Login", LoginSchema);

export default loginModel;
