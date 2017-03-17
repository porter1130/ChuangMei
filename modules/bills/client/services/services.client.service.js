/**
 * Created by jcwang on 2017/3/14.
 */
(function () {
  'use strict';

  angular
    .module('bills.services')
    .factory('BillService', BillService);

  BillService.$inject = ['$resource', '$log'];

  function BillService($resource, $log) {
    var Bill = $resource('/api/bills/:billId', {
      billId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Bill.prototype, {
      createOrUpdate: function () {
        var bill = this;
        return createOrUpdate(bill);
      }
    });

    return Bill;

    function createOrUpdate(bill) {
      if (bill._id) {
        return bill.$update(onSuccess, onError);
      } else {
        return bill.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(bill) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
