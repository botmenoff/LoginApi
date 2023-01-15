import { Router } from "express";
const router = Router()

//Con el * importamos todo con el nombre de productController
import * as productController from "../controllers/products.controller.js";
import middlewares from '../middlewares/middleWare.js'

router.get('/products', productController.getProducts)
    .post('/products', middlewares.verifyToken, middlewares.isAdmin, productController.createProduct)
    .get('/products/:productId', productController.getProductById)
    .put('/products/:productId', middlewares.verifyToken, middlewares.isAdmin, middlewares.checkRoles, productController.updateProductById)
    .delete('/products/:productId', middlewares.verifyToken, middlewares.isAdmin, productController.deleteProductById)

export default router;