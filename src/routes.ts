import { Router } from "express";

import { UserController } from './controllers/UserController';
import { SessionController } from "./controllers/SessionController";
import { PermissionController } from "./controllers/PermissionController";
import { RoleController } from "./controllers/RoleContrloler";

const routes = Router();

const userController = new UserController();
const sessionController = new SessionController();
const permissionController = new PermissionController();
const roleController = new RoleController();

routes.post('/users', userController.create);
routes.post("/sessions", sessionController.create);

routes.post("/permissions", permissionController.create);
routes.post("/roles", roleController.create);

export { routes };
