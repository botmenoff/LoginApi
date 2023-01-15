import { Router } from "express";
const router = Router()
import authCtrl from '../controllers/auth.controller.js'
import middlewares from '../middlewares/middleWare.js'

router.post('/signIn', authCtrl.sigIn)
    .post('/signUp', middlewares.validateLogin, authCtrl.signUp)
    .put('/forgotPasswd', authCtrl.resetpasswd)
    .get('/select', authCtrl.getUsers)

export default router;