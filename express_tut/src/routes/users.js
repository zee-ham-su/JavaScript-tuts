import { Router } from "express";
import { query, validationResult, checkSchema, body, matchedData } from "express-validator";
import{ UserValidationSchema } from '../utils/validationSchema.js';
import { dummyData } from '../utils/data.js';
import { resolveIndexByUserId  } from '../utils/middlewares.js'

const router = Router();


router.get('/api/users',
  query('filter')
    .isString()
    .notEmpty()
    .withMessage('must not be empty')
    .isLength({ min: 3, max: 10 })
    .withMessage('filter must be a string with length between 3 and 10'),
  (req, res) => {
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
  '/api/users', checkSchema(UserValidationSchema),
  (req, res) => {
    const results = validationResult(req);
    console.log(results);
    if (!results.isEmpty()) {
      return res.status(400).send({ errors: results.array() });
    }
    const data = matchedData(req);
    const newUser = { id: dummyData[dummyData.length - 1].id + 1, ...data };
    dummyData.push(newUser);
    return res.status(201).send(newUser);
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


export default router;