import { Router } from "express";
import * as controller from "../controllers/controller.js";
import { userRegisterValidate, userLoginValidate } from "../middlewares/userValidation.js"
import { ensureAuthentication }from "../middlewares/ensureAuth.js";

const router = Router();
 
router.route('/pins')
.get(controller.getPins) 
.post(ensureAuthentication, controller.createPin) 
.delete(ensureAuthentication, controller.dropPins)

router.post('/register', userRegisterValidate, controller.register)
router.post('/login', userLoginValidate, controller.login)
router.get('/logout', ensureAuthentication, controller.logout)

export default router;