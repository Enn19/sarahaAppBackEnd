import { Router } from 'express';
import {  deleteMessage,sendMessage } from './controller/mesaage.controller.js';
import auth from './../../middleWar/auth.js';
const router =Router()

    router.post("/:id",sendMessage)
    router.delete("/:id", deleteMessage);
export default router
