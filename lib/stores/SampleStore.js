var AppDispatcher = require('../dispatcher'),
    EventEmitter = require('events').EventEmitter,
    SampleConstants = require('../constants/SampleConstants'),
    $ = require('jquery'),
    uuid = require('node-uuid');

var CHANGE_EVENT = 'change';

var _items = { items: [] };

function create(name) {
  var newItem = {
    id: uuid.v4(),
    name: name
  };

  _items.items.push(newItem);

  return newItem;
}

function destroy(id) {
  var item = _items.items.filter(x => x.id == id)[0];
  _items.items.splice(_items.items.indexOf(item), 1);
}

function SampleStore() {
  this.initialize();
}

SampleStore.prototype = Object.create(EventEmitter.prototype);

SampleStore.prototype.getAll = function() {
  return _items;
};

SampleStore.prototype.initialize = function() {
  $.ajax({
    url: '/api/items',
    type: 'get',
    success: function(items) {
      _items = items;
      this.emitChange();
    }.bind(this)
  });

  this.dispatcherIndex = AppDispatcher.register(function(action) {
    var item;

    switch(action.actionType) {
      case SampleConstants.CREATE:
        item = action.item.trim();
        if (!!item) {
          var t = create(item);
          $.ajax({
            url: '/api/items',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(t),
            success: function(d) {
              this.emitChange();
            }.bind(this)
          });
        }
        break;

      case SampleConstants.DESTROY:
        $.ajax({
          url: '/api/items/' + action.id,
          type: 'delete',
          success: function(items) {
            _items = items;
            this.emitChange();
          }.bind(this)
        });
        this.emitChange();
        break;
    }

    return true;
  }.bind(this));
};

SampleStore.prototype.emitChange = function() {
  this.emit(CHANGE_EVENT);
};

SampleStore.prototype.addChangeListener = function(callback) {
  this.on(CHANGE_EVENT, callback);
};

SampleStore.prototype.removeChangeListener = function(callback) {
  this.removeListener(CHANGE_EVENT, callback);
};

module.exports = new SampleStore();