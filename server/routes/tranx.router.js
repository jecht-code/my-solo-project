const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  const sqlText = `SELECT transactions.*, cards.user_id FROM "cards" 
  JOIN "transactions"
  ON cards.id = transactions.card_id;`;
  pool
    .query(sqlText)
    .then((result) => {
      // console.log('DB returned', result);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error making DB ${sqlText}`, error)
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;