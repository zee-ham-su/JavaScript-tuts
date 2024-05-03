import { Router } from "express";
import { query, validationResult, checkSchema, body, matchedData } from "express-validator";
import{ UserValidationSchema } from '../utils/validationSchema.js';
import { dummyData } from '../utils/data.js';
import { resolveIndexByUserId  } from '../utils/middlewares.js'
import { User } from '../mongoose/schemas/user.js'
const router = Router();


router.get('/api/users',
  query('filter')
    .isString()
    .notEmpty()
    .withMessage('must not be empty')
    .isLength({ min: 3, max: 10 })
    .withMessage('filter must be a string with length between 3 and 10'),
  (req, res) => {
    console.log(req.session.id);
    req.sessionStore.get(req.session.id, (err, sessionData) => {
      if (err) {
        console.log(err);
        throw err;
      }
      console.log(sessionData);
    });
    const results = validationResult(req);
    console.log(results);
    const {
      query: {filter, value},
    } = req;

  // when filter and value are defined
    if (filter && value) 
      return res.send(dummyData.filter((user) => user[filter].includes(value)));

    return res.send(dummyData);

  });


router.post(
  '/api/users', checkSchema(UserValidationSchema), async (req, res) => {
    const { body } = req;
    const newUser = new User(body);
    try {
      const result = await newUser.save();
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json(error);
    } 
    });

router.get('/api/users/:id', resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;
  const findUser = dummyData[findUserIndex];
  if (!findUser) 
    return res.status(404).send({msg: 'User not found'});
    return res.send(findUser);

});

router.put("/api/users/:id", resolveIndexByUserId, (request, response) => {
	const { body, findUserIndex } = request;
	dummyData[findUserIndex] = { id: dummyData[findUserIndex].id, ...body };
	return response.sendStatus(200);
});

router.patch("/api/users/:id", resolveIndexByUserId, (request, response) => {
	const { body, findUserIndex } = request;
	dummyData[findUserIndex] = { ...dummyData[findUserIndex], ...body };
	return response.sendStatus(200);
});

router.delete("/api/users/:id", resolveIndexByUserId, (request, response) => {
	const { findUserIndex } = request;
	dummyData.splice(findUserIndex, 1);
	return response.sendStatus(200);
});

router.get('/', (req, res) => {
    console.log(req.session);
    console.log(req.sessionID);
    req.session.visited = true;
    res.cookie('hello', 'world', {
      maxAge: 60000 * 60 * 24,
      signed: true,
    });
  res.status(201).send({msg: 'Hello World!'});

});


export default router;