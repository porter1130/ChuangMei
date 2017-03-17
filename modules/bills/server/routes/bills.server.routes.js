/**
 * Created by jcwang on 2017/3/14.
 */
'use strict';

/**
 * Module dependencies
 */
var billsPolicy = require('../policies/bills.server.policy'),
  bills = require('../controllers/bills.server.controller');

module.exports = function (app) {
  // Articles collection routes
  app.route('/api/bills').all(billsPolicy.isAllowed)
    .get(bills.list)
    .post(bills.create);

  // Single article routes
  app.route('/api/bills/:billId').all(billsPolicy.isAllowed)
    .get(bills.read)
    .put(bills.update)
    .delete(bills.delete);

  // Finish by binding the article middleware
  app.param('billId', bills.billByID);
};
