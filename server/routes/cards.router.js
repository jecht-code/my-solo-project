const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  const sqlText = `SELECT * FROM cards ORDER BY date_start;`;
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
  console.log(`POST /Card req.body:`, req.body);
  const sqlText = `
  INSERT INTO "cards" 
  ("cc_name", "date_start", "date_promo_end", "spend_goal", "credit_limit", "rewards_value", "bankcard_name", "user_id")
  VALUES
  ($1, $2, $3, $4, $5, $6, $7, $8);`;

  const sqlValues = [
    req.body.cc_name,
    req.body.date_start,
    req.body.date_promo_end,
    req.body.spend_goal,
    req.body.credit_limit,
    req.body.rewards_value,
    req.body.bankcard_name,
    req.body.user_id
  ]

  pool
    .query(sqlText, sqlValues)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error adding transaction:`, error);
      res.sendStatus(500);
    });
});

/**
 * DELETE route template
 */
router.delete('/:id', (req, res) => {
  pool.query('DELETE FROM "cards" WHERE id=$1', [req.params.id]).then((result) => {
      res.sendStatus(200);
  }).catch((error) => {
      console.log('Error DELETE /api/cards', error);
      res.sendStatus(500);
  })
});

module.exports = router;