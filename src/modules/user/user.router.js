import { Router } from 'express'
import auth from './../../middleWar/auth.js';
import * as userController from "./controller/user.controller.js"
import * as userValidation from "./user.validation.js"
import { validation } from '../../middleWar/validation.js';
import userEndPoint from './user.endPoint.js';
import uploadFile, { fileValidation } from './../../utils/uploadsFile.js';
const router = Router()

router.get("/profile", userController.profileDisplay)
router.get("/notAuthorized", userController.notAuthorizedDisplay)
router.post("/profileImage", uploadFile({ customValidation: fileValidation.image }).single("image"), userController.profileUser)
router.get("/shareProfile/:id", userController.profileOneDisplay)
router.get("/logOut",userController.logOut)



export default router