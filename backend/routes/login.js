import express from "express";
import jwt from "jsonwebtoken";
import loginUser from "../controllers/loginController.js";

const loginRouter = express.Router();

loginRouter.post("/", loginUser);

export default loginRouter;
