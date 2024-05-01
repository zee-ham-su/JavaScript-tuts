import express from 'express';
import routes from './routes/index.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import "./strategies/local-strategy.js"


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
app.use(passport.initialize())
app.use(passport.session())

app.use(routes);




const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server is running on port', PORT)
});
