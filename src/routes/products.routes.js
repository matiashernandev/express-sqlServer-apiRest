import { Router } from "express"; //permite crear url

import {
    getProducts,
    createNewProduct,
    getProductById,
    deleteProductById,
    getTotalProducts,
    updateProductById,
} from "../controllers/products.controller";

const router = Router();

router.get("/products", getProducts);

router.get("/products/count", getTotalProducts);

router.post("/products", createNewProduct);

router.get("/products/:id", getProductById);

router.put("/products/:id", updateProductById);

router.delete("/products/:id", deleteProductById);

export default router;
