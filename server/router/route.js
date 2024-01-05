import { Router } from "express";
import * as controller from "../controllers/controller.js";

const router = Router();
 
router.route('/pins')
.get(controller.getPins)  // GET Request
.post(controller.createPin) // Post Request
.delete(controller.dropPins)

router.post('/register', controller.register)
router.post('/login', controller.login)

export default router;