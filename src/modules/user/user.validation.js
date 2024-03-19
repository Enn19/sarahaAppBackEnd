import joi from 'joi';
import generalFeild from './../../utils/genarelFiled.js';

export const addToWishListSchema = joi.object({
    authorization: generalFeild.token,
    productId: generalFeild._id
}).required()

export const veiwSchema=joi.object({
    _id:generalFeild._id
}).required()