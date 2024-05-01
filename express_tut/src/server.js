import express from 'express';
import routes from './routes/index.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { dummyData } from './utils/data.js';

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
  const { username, password } = req.body;
  const findUser = dummyData.find((user) => user.username === username);
  if (!findUser) {
    return res.status(401).send({ msg: 'User not found' });
  }
  if (findUser.password !== password) {
    return res.status(401).send({ msg: 'Password is incorrect' });
  }
  req.session.user = findUser;
  return res.status(200).send(findUser);
});

app.get('/api/auth/status', (req, res) => {
  if (req.session.user) {
    return res.status(200).send(req.session.user);
  }
  return res.status(401).send({ msg: 'User not logged in' });
}); 


app.listen(PORT, () => {
  console.log('Server is running on port', PORT)
});
