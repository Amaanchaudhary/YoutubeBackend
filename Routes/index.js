import {Router} from 'express'
import AuthRouters from './Auth.routes.js'
import ProductRouters from './Product.routes.js'

const router = Router();

router.use("/auth" , AuthRouters)
router.use("/products" , ProductRouters)

export default router;

