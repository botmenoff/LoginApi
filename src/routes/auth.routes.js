import { Router } from "express";
const router = Router()
import * as authCtrl from '../controllers/auth.controller'
import middlewares from '../middlewares/middleWare'

router.post('/signIn', authCtrl.sigIn)
    .post('/signUp', middlewares.validateLogin, authCtrl.signUp)
    .put('/forgotPasswd', authCtrl.resetpasswd)
    .get('/select', authCtrl.getUsers)

export default router;