/**
 * Created by jcwang on 2017/3/14.
 */
'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Bill = mongoose.model('Bill'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an article
 */
exports.create = function (req, res) {
  var bill = new Bill(req.body);
  bill.user = req.user;

  bill.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bill);
    }
  });
};

/**
 * Show the current article
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var bill = req.bill ? req.bill.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  bill.isCurrentUserOwner = !!(req.user && bill.user && bill.user._id.toString() === req.user._id.toString());

  res.json(bill);
};

/**
 * Update an article
 */
exports.update = function (req, res) {
  var bill = req.bill;

  bill.title = req.body.title;
  bill.content = req.body.content;

  bill.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bill);
    }
  });
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
  var bill = req.bill;

  bill.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bill);
    }
  });
};

/**
 * List of Articles
 */
exports.list = function (req, res) {
  Bill.find().sort('-created').populate('user', 'displayName').exec(function (err, bills) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(bills);
    }
  });
};

/**
 * Article middleware
 */
exports.billByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Bill is invalid'
    });
  }

  Bill.findById(id).populate('user', 'displayName').exec(function (err, bill) {
    if (err) {
      return next(err);
    } else if (!bill) {
      return res.status(404).send({
        message: 'No bill with that identifier has been found'
      });
    }
    req.bill = bill;
    next();
  });
};
