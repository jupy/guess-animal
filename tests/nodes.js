var app = require('../app'),
  assert = require('assert'),
  request = require('superagent');

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
