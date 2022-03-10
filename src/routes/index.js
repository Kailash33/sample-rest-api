import express from "express";
import { registerController, loginController, fetchUserController } from "../controller";
import { authenticate } from "../middleware";

const routes = express.Router();

// ------------------------- AUTHENTICATION CONTROLLERS ------------------------------
routes.post("/auth/register", registerController.register);

routes.post("/auth/login", loginController.login);

routes.get('/fetch', authenticate, fetchUserController.fetch)



export default routes;
