import express from 'express';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const dummyData = [
    { id: 1, username: 'John Doe', displayName: 'John D'},
    { id: 2, username: 'Jane Doe', displayName: 'Jane D'},
    { id: 3, username: 'John Smith', displayName: 'John S'},
    { id: 4, username: 'Jane Smith', displayName: 'Jane S'},
    { id: 5, username: 'Sufian Hamza', displayName: 'Sufian H'},
    { id: 6, username: 'Kobe Bryant', displayName: 'Kobe B'},
    { id: 7, username: 'Lebron James', displayName: 'Lebron J'},
    { id: 8, username: 'Kevin Durant', displayName: 'Kevin D'},
    { id: 9, username: 'Stephen Curry', displayName: 'Stephen C'},
    { id: 10, username: 'Michael Jordan', displayName: 'Michael J'},
  ];


  app.get('/', (req, res) => {
  res.status(201).send({msg: 'Hello World!'});
});

app.get('/api/users', (req, res) => {
  console.log(req.query);
  const {
    query: {filter, value},
  } = req;

  // when filter and value are defined
  if (filter && value) 
    return res.send(dummyData.filter((user) => user[filter].includes(value)));

  return res.send(dummyData);

});

app.post('/api/users', (req, res) => {
  const { body } = req;
  const newUser = { id: dummyData[dummyData.length - 1].id + 1, ...body };
  dummyData.push(newUser);
  return res.status(201).send(newUser);
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
