const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /health:
 *  get:
 *    description: Use to request all customers
 *  responses:
 *  '200':
 *    description: A successful response
 */
router.get('/', (req, res) => {
    res.status(200).send('API is running');
  });
  
module.exports = router;