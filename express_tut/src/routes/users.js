import { Router } from "express";
import { query, validationResult, checkSchema } from "express-validator";
import{ UserValidationSchema } from '../utils/validationSchema.js';
import { dummyData } from '../utils/data.js';

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

export default router;