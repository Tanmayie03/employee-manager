import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  mobile: { type: Number, require: true },
  designation: { type: String, require: true },
  gender: { type: String, require: true },
  course: { type: Array, require: true },
  image: { type: String },
  createAt: { type: Date, default: Date.now() },
});

const employeeModel = mongoose.model("Employee", EmployeeSchema);

export default employeeModel;
