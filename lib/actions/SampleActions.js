var AppDispatcher = require('../dispatcher'),
    SampleConstants = require('../constants/SampleConstants');

module.exports = {
  create: function(term) {
    AppDispatcher.dispatch({
      actionType: SampleConstants.CREATE,
      term: term
    });
  },

  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: SampleConstants.DESTROY,
      id: id
    });
  }
};