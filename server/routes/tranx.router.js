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
  console.log(`POST /Tranx req.body:`, req.body);
  const sqlText = `
  INSERT INTO "transactions"
  ("day_of_spend", "date_spend_added", "category_spend", "card_id")
  VALUES
  ($1, $2, $3, $4);`;

  const sqlValues = [req.body.day_of_spend, req.body.date_spend_added, req.body.category_spend, req.body.cardselected]

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
  pool.query('DELETE FROM "transactions" WHERE id=$1', [req.params.id]).then((result) => {
      res.sendStatus(200);
  }).catch((error) => {
      console.log('Error DELETE /api/tranx', error);
      res.sendStatus(500);
  })
});

/**
 * PUT route template
 */

router.put('/:id', (req, res) => {
  const sqlText = `
  UPDATE "transactions"
  SET "day_of_spend" = $2, "date_spend_added" = $3, "category_spend" = $4
  WHERE "id" = $1;
  `;
  const { id } = req.params;
  const { day_of_spend, date_spend_added, category_spend } = req.body;

  pool
    .query(sqlText, [id, day_of_spend, date_spend_added, category_spend ])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((dbErr) => {
      console.log('error getting books', dbErr);
      res.sendStatus(500);
    });
});

module.exports = router;