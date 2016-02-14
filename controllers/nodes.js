var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a node0');
});

router.get('/:id', function(req, res, next) {
  res.send('respond with a node: ' + req.params.id);
});

router.post('/', function(req, res, next) {
  res.send('respond with a node');
});

module.exports = router;
