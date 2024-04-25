import { Router } from 'express';

const productRouter = Router();

productRouter.get("/api/products", (req, res) => {
  console.log(req.headers.cookie);
  res.send([
    { id: 1, name: 'phone', price: 1000.00 },
    { id: 2, name: 'laptop', price: 2000.99 },
    { id: 3, name: 'tablet', price: 1500.50 },
    { id: 4, name: 'desktop', price: 2500.75 },
  ]);
});




export default productRouter;