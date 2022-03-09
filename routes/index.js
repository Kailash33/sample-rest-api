import express from "express";
import { registerController, loginController } from "../controller";

const routes = express.Router();

// ------------------------- AUTHENTICATION CONTROLLERS ------------------------------
routes.post("/auth/register", registerController.register);

routes.post("/auth/login", loginController.login);


export default routes;
