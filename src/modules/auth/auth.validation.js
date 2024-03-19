import joi from 'joi';
import generalFeild from './../../utils/genarelFiled.js';


export const signUpSchema = joi.object({
   userName: joi.string().min(2).max(10).required(),
   email: generalFeild.email,
   password: generalFeild.password,
   cPassword: joi.string().valid(joi.ref("password")).required(),
   file: generalFeild.file,
   phone: joi.string().min(11),
   gender: joi.string()
}).required()


export const loginSchema = joi.object({
   email: generalFeild.email,
   password: generalFeild.password,
}).required()
