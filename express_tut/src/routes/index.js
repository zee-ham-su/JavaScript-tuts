import { Router } from "express";
import usersRouter from "./users.js";
import productsRouter from "./product.js";


const router = Router();

router.use(usersRouter);
router.use(productsRouter);

export default router;