import { Router } from "express";
import { createProduct, readAllProducts } from "../controllers/products.controllers.js";

const router = Router();

router.route('/').get(readAllProducts).post(createProduct);


export default router;