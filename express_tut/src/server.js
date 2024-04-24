import express from 'express';
import routes from './routes/index.js';

const app = express();
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;

  app.get('/', (req, res) => {
  res.status(201).send({msg: 'Hello World!'});

});


app.listen(PORT, () => {
  console.log('Server is running on port', PORT)
});
