import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(201).send({msg: 'Hello World!'});
});

app.listen(PORT, () => {
  console.log('Server is running on port', PORT)
});
