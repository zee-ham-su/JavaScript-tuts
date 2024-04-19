import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

const dummyData = [
    { id: 1, name: 'John Doe'},
    { id: 2, name: 'Jane Doe'},
    { id: 3, name: 'John Smith'},
    { id: 4, name: 'Jane Smith'},
  ];


  app.get('/', (req, res) => {
  res.status(201).send({msg: 'Hello World!'});
});

app.get('/api/users', (req, res) => {
  res.send(dummyData);
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


app.listen(PORT, () => {
  console.log('Server is running on port', PORT)
});
