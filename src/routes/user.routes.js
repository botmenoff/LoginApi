import { Router } from "express";
const router = Router()
import userController from '../controllers/user.controller'
import middlewares from '../middlewares/middleWare'


router.post('/user/new', middlewares.verifyToken, middlewares.checkRoles, middlewares.isAdmin, userController.createUser)
    .get('/user/get', middlewares.verifyToken, middlewares.isAdmin, userController.getAllUsers)
    .get('/user/get/:userId', middlewares.verifyToken, middlewares.isAdmin, userController.getUserById)
    .put('/user/update/:userId', middlewares.verifyToken, middlewares.isAdmin, userController.updateUserById)
    .delete('/user/del/:userId', middlewares.verifyToken, middlewares.isAdmin, userController.deleteUserById)

export default router;