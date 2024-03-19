import { Router } from 'express'
import * as authController from './../auth/controller/auth.controller.js'
import * as authValidation from "./auth.validation.js"
import { validation } from '../../middleWar/validation.js'
const router = Router()

router
    .get("/", authController.displaySignUp)
    .post("/signUp", authController.signUpAction)
    .get("/logIn", authController.displayLogIn)
    .post("/logIn", validation(authValidation.loginSchema, "/auth/logIn"), authController.loginAction)

export default router
