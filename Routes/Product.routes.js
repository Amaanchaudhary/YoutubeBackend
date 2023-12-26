import { Router } from "express";
import { addProduct } from "../Controllers/Products.controllers.js";

const router = Router();

router.post("/add-product", addProduct)


export default router;