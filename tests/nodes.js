var app = require('../app');
var assert = require('assert');
var request = require('superagent');

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

describe('Proba', function() {
  it('should be ok for the first test', function() {
    assert.equal(true, true);
  });

  it('should be NOT ok for the second test', function() {
    assert.equal(true, false);
  });
});
