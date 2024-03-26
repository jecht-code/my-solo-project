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