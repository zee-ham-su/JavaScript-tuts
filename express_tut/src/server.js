import express from 'express';
import usersRouter from './routes/users.js';

const app = express();
app.use(express.json());
app.use(usersRouter);

const PORT = process.env.PORT || 3000;

  app.get('/', (req, res) => {
  res.status(201).send({msg: 'Hello World!'});

});

app.get("/api/products", (req, res) => {
  res.send([
    { id: 1, name: 'phone', price: 1000.00 },
    { id: 2, name: 'laptop', price: 2000.99 },
    { id: 3, name: 'tablet', price: 1500.50 },
    { id: 4, name: 'desktop', price: 2500.75 },
  ]);
});


app.listen(PORT, () => {
  console.log('Server is running on port', PORT)
});
