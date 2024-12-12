import express from "express";
import auth from "../middleware/auth.js";
import {
  createEmployee,
  displayEmployees,
  removeEmployee,
  singleEmployee,
  updateEmployee,
} from "../controllers/employeeController.js";
import upload from "../middleware/multer.js";

const employeeRouter = express.Router();

employeeRouter.post("/create", auth, upload.single("image"), createEmployee);
employeeRouter.get("/", auth, displayEmployees);
employeeRouter.get("/:id", auth, singleEmployee);
employeeRouter.delete("/:id", auth, removeEmployee);
employeeRouter.put("/:id", auth, updateEmployee);

export default employeeRouter;
