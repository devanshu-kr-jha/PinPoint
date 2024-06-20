import { Router } from "express";
import * as controller from "../controllers/controller.js";
import { userRegisterValidate, userLoginValidate } from "../middlewares/userValidation.js"
import { ensureAuthentication }from "../middlewares/ensureAuth.js";
import sessionMiddleware from "../middlewares/attachSession.js";
import rateLimiter from "../middlewares/rateLimiter.js";

const router = Router();
 
router.route('/pins')
.get(controller.getPins) 
.post(sessionMiddleware, ensureAuthentication, controller.createPin) 
.delete(sessionMiddleware, ensureAuthentication, controller.dropPins)

router.post('/register', userRegisterValidate, controller.register)
router.post('/login',rateLimiter, userLoginValidate, sessionMiddleware, controller.login)
router.get('/logout', sessionMiddleware, ensureAuthentication, controller.logout)

router.get('/protected', sessionMiddleware, ensureAuthentication, (req, res) => { //for testing
    res.status(200).json({message: 'Welcome to protected route'})
})

export default router;