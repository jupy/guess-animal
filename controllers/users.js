var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('<html><body><p>respond with a resource new 7</p></body></html>');
});

module.exports = router;
