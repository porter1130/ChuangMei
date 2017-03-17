/**
 * Created by jcwang on 2017/3/15.
 */
(function () {
  'use strict';

  angular
    .module('users.admin')
    .controller('PermissionsAdminController',PermissionsAdminController);

  PermissionsAdminController.$inject=['$scope','$state','permissionResolve','Notification'];

  function PermissionsAdminController($scope,$state,permission,Notification) {
      var vm=this;

      vm.permission=permission;
      vm.save=save;

      function save(isValid) {
        if(!isValid){
          $scope.$broadcast('show-errors-check-validity','vm.form.permissionForm');
          return false;
        }

        if(!vm.bill._id){
          vm.bill.$save().then(successCallback).catch(errorCallback);
        }else{
          vm.bill.$update().then(successCallback).catch(errorCallback);
        }

        function successCallback() {
          $state.go('admin.permissions.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Permission saved successfully!' });
        }

        function errorCallback(res) {
          Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Permission save error!' });
        }

      }
  }

}());
