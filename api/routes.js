'use strict';
module.exports = function(app) {
  var valueController = require('./controllers/valueController');

  app.route('/values')
    .get([valueController.values]);
};