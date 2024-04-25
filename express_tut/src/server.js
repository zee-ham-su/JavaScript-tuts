import express from 'express';
import routes from './routes/index.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser("helloworld"));
app.use(routes);


const PORT = process.env.PORT || 3000;

  app.get('/', (req, res) => {
    res.cookie('hello', 'world', {
      maxAge: 60000 * 60 * 24,
      signed: true,
    });
  res.status(201).send({msg: 'Hello World!'});

});


app.listen(PORT, () => {
  console.log('Server is running on port', PORT)
});
