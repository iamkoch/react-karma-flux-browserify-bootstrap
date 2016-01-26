var express = require('express'),
    router = express.Router();

var _items ={
  items: [
    { id: 'blah', term: 'this is an existing term' }
  ]
}

router.get('/items', function(req, res) {
  res.status(200).json(_items);
});

router.post('/items', function(req, res) {
  _terms.subscriptions.push(req.body);
  res.status(200).json(_items);
});

router.delete('/items/:id', function(req, res) {
  var id = req.params.id;
  console.log('['+id+'] DELETE');
  console.log('['+id+'] ' + JSON.stringify(_items));
  var matchingById = _items.items.filter(function(x) { return x.id == id })[0];

  console.log('['+id+'] ' + JSON.stringify(matchingById));
  _items.items.splice(_items.items.indexOf(matchingById), 1);
  res.status(200).json(_items);
});

module.exports = router;