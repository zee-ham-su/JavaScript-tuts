import express from 'express';
import { query, validationResult, body, matchedData, checkSchema } from 'express-validator';
import{ UserValidationSchema } from './utils/validationSchema.js';
import usersRouter from './routes/users.js';
import { dummyData } from './utils/data.js';

const app = express();
app.use(express.json());
app.use(usersRouter);

const loggingMiddleware = (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
};

app.use(loggingMiddleware);

const PORT = process.env.PORT || 3000;



  app.get('/', loggingMiddleware, (req, res) => {
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

app.get('/api/users/:id', (req, res) => {
  console.log(req.params);
  const parsedId = parseInt(req.params.id);
  console.log(parsedId);
  if (isNaN(parsedId)) {
    res.status(400).send({msg: 'Invalid ID supplied'});
  };
  const findUser = dummyData.find((user) => user.id === parsedId);
  if (!findUser)
    return res.status(404).send({msg: 'User not found'});
    return res.send(findUser);

});

app.put('/api/users/:id', (req, res) => {
  const { 
    body,
    params: { id },
  } = req;
  
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) {
    return res.status(400).send({msg: 'Invalid ID supplied'});
  };
  const findUserIndex = dummyData.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1)
    return res.status(404).send({msg: 'User not found'});

  dummyData[findUserIndex] = { id: parsedId, ...body };
  return res.sendStatus(204);
});

app.patch('/api/users/:id', (req, res) => {
  const { 
    body,
    params: { id },
  } = req;
  
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) {
    return res.status(400).send({msg: 'Invalid ID supplied'});
  };
  const findUserIndex = dummyData.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1)
    return res.status(404).send({msg: 'User not found'});
  dummyData[findUserIndex] = { ...dummyData[findUserIndex], ...body };
  return res.sendStatus(204);
});

app.delete('/api/users/:id', (req, res) => {
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) {
    return res.status(400).send({msg: 'Invalid ID supplied'});
  };
  const findUserIndex = dummyData.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1)
    return res.status(404).send({msg: 'User not found'});
  dummyData.splice(findUserIndex, 1);
  return res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log('Server is running on port', PORT)
});
