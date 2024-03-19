import  joi  from 'joi';
import generalFeild from '../../utils/genarelFiled.js';
 
export const addMessageSchema=joi.object({
    message:joi.string().min(10).max(500).required(),
    receivedId:generalFeild._id
}).required()

export const deleteMessageSchema=joi.object({
        
    _id:generalFeild._id,
    authorization:generalFeild.token
}).required()