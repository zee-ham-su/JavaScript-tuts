import express from 'express';
import usersRouter from './routes/users.js';
import productRouter from './routes/product.js';

const app = express();
app.use(express.json());
app.use(usersRouter);
app.use(productRouter);

const PORT = process.env.PORT || 3000;

  app.get('/', (req, res) => {
  res.status(201).send({msg: 'Hello World!'});

});


app.listen(PORT, () => {
  console.log('Server is running on port', PORT)
});
