var express = require('express');
var router = express.Router();

module.exports = (db) => {

  router.get('/', function (req, res, next) {
    db.query('SELECT * FROM typedata', (err, respone) => {
      if (err) return res.status(500).json(err)
      res.json(respone.rows)
    })
  });

  router.get('/:id', function (req, res, next) {
    db.query(`SELECT * FROM typedata WHERE id=${req.params.id}`, (err, respone) => {
      if (err) return res.status(500).json(err)
      res.json(respone.rows)
    })
  });

  router.get('/p/:id', function (req, res, next) {
    let posisi = (Number(req.params.id) - 1) * 3
    let page = req.params.id || 1
    let start = page * 3 - 3
    // let start = req.params.id
    db.query(`SELECT * FROM typedata LIMIT 3 OFFSET ${posisi}`, (err, respone) => {
      if (err) return res.status(500).json(err)
      db.query(`SELECT * FROM typedata`, (err, respon) => {
        let obj1 = {obj: respone.rows}
        let obj2 = {jumlah: respon.rowCount}
        let obj3 = {start}
        let merged = { ...obj1, ...obj2, ...obj3 }
        console.log(merged)
        res.json(merged)
      })
    })
  });

  router.post('/f/', function (req, res, next) {
    if (req.body.boolean !== "" && req.body.startDate !== "" && req.body.endDate !== "") {
      db.query(`SELECT * FROM typedata WHERE string = $1 OR integer = $2 OR float = $3 OR boolean = $4 OR date >= $5 AND date <= $6`, [req.body.string, Number(req.body.integer), req.body.float, req.body.boolean, req.body.startDate, req.body.endDate], (err, respone) => {
        if (err) return res.status(500).json(err)
        res.json(respone.rows)
      })
    } else if (req.body.boolean !== "") {
      db.query(`SELECT * FROM typedata WHERE string = $1 OR integer = $2 OR float = $3 OR boolean = $4`, [req.body.string, Number(req.body.integer), req.body.float, req.body.boolean], (err, respone) => {
        if (err) return res.status(500).json(err)
        res.json(respone.rows)
      })
    } else if (req.body.startDate !== "" && req.body.endDate !== "") {
      db.query(`SELECT * FROM typedata WHERE string = $1 OR integer = $2 OR float = $3 OR date >= $4 AND date <= $5`, [req.body.string, Number(req.body.integer), req.body.float, req.body.startDate, req.body.endDate], (err, respone) => {
        if (err) return res.status(500).json(err)
        res.json(respone.rows)
      })
    } else {
      db.query(`SELECT * FROM typedata WHERE string = $1 OR integer = $2 OR float = $3`, [req.body.string, Number(req.body.integer), req.body.float], (err, respone) => {
        if (err) return res.status(500).json(err)
        res.json(respone.rows)
      })
    }
  });

  router.post('/', function (req, res, next) {
    db.query('INSERT INTO typedata (string, integer, float, date, boolean) VALUES ($1, $2, $3, $4, $5)', [req.body.string, req.body.integer, req.body.float, req.body.date, req.body.boolean], (err, respone) => {
      if (err) return res.status(500).json(err)
      res.json(respone.rows)
    })
  });

  router.put('/:id', function (req, res, next) {
    db.query('UPDATE typedata SET string =$1, integer=$2, float=$3, date=$4, boolean=$5 WHERE id=$6', [req.body.string, Number(req.body.integer), Number(req.body.float), req.body.date, req.body.boolean, Number(req.params.id)], (err, respone) => {
      if (err) return res.status(500).json(err)
      res.json(respone.rows)
    })
  });

  router.delete('/:id', function (req, res, next) {
    db.query('DELETE FROM typedata WHERE id=$1', [Number(req.params.id)], (err, respone) => {
      if (err) return res.status(500).json(err)
      res.json(respone.rows)
    })
  });

  return router;
}