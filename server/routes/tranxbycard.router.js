const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * DELETE route template
 */
router.delete('/:id', (req, res) => {
    pool.query('DELETE FROM "transactions" WHERE card_id=$1', [req.params.id]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error DELETE /api/tranxbycard', error);
        res.sendStatus(500);
    })
  });