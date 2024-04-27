import express from 'express';
import routes from './routes/index.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const app = express();

app.use(express.json());
app.use(cookieParser("helloworld"));
app.use(session({
  secret: 'sufian hamza',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 60000 * 60 * 24,
  },
}))
app.use(routes);


const PORT = process.env.PORT || 3000;

  app.get('/', (req, res) => {
    console.log(req.session);
    console.log(req.sessionID);
    req.session.visited = true;
    res.cookie('hello', 'world', {
      maxAge: 60000 * 60 * 24,
      signed: true,
    });
  res.status(201).send({msg: 'Hello World!'});

});

app.post('/api/auth', (req, res) => {
  const { body } = req;
  

});


app.listen(PORT, () => {
  console.log('Server is running on port', PORT)
});
