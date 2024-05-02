import express from 'express';
import routes from './routes/index.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import "./strategies/local-strategy.js"
import mongoose from 'mongoose';

const app = express();

mongoose.connect('mongodb://localhost:27017/express-tut')
.then(() => console.log(' successfully connected to MongoDB'))
 .catch((err) => console.log(err));

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
app.use(passport.initialize())
app.use(passport.session())

app.use(routes);

app.post(
  '/api/auth',
  passport.authenticate('local'),
  (req, res) => {
    res.sendStatus(200);
  });

app.get('/api/auth/status', (req, res) => {
  console.log('inside /auth/status endpoint');
  console.log(req.user);
  console.log(req.session);
  return req.user ? res.send(req.user) : res.sendStatus
  (401);
});

app.post('/api/auth/logout', (req, res) => {
  if (!req.user) return res.sendStatus(401);
  req.logout((err) => {
    if (err) return res.sendStatus(400);
    return res.sendStatus(200);
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server is running on port', PORT)
});
