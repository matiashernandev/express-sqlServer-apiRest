import { Router } from "express"; //permite crear url

import {
    getProducts,
    createNewProduct,
} from "../controllers/products.controller";

const router = Router();

router.get("/products", getProducts);

router.get("/products");

router.post("/products", createNewProduct);

router.put("/products");

router.delete("/products");

export default router;
