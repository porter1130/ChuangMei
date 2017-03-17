/**
 * Created by jcwang on 2017/3/14.
 */
(function () {
  'use strict';

  angular
    .module('bills.admin')
    .controller('BillsAdminController', BillsAdminController);

  BillsAdminController.$inject = ['$scope', '$state', '$window', 'billResolve', 'Authentication', 'Notification'];

  function BillsAdminController($scope, $state, $window, bill, Authentication, Notification) {
    var vm = this;

    vm.bill = bill;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Article
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.bill.$remove(function() {
          $state.go('admin.bills.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Bill deleted successfully!' });
        });
      }
    }

    // Save Article
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.billForm');
        return false;
      }

      // Create a new article, or update the current instance
      vm.bill.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.bills.list'); // should we send the User to the list or the updated Article's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Bill saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Bill save error!' });
      }
    }
  }
}());
