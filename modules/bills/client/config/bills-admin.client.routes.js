/**
 * Created by jcwang on 2017/3/14.
 */
(function () {
  'use strict';

  angular
    .module('bills.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.bills', {
        abstract: true,
        url: '/bills',
        template: '<ui-view/>'
      })
      .state('admin.bills.list', {
        url: '',
        templateUrl: '/modules/bills/client/views/admin/list-bills.client.view.html',
        controller: 'BillsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.bills.create', {
        url: '/create',
        templateUrl: '/modules/bills/client/views/admin/form-bill.client.view.html',
        controller: 'BillsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          billResolve: newBill
        }
      })
      .state('admin.bills.edit', {
        url: '/:billId/edit',
        templateUrl: '/modules/bills/client/views/admin/form-bill.client.view.html',
        controller: 'BillsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          billResolve: getBill
        }
      });
  }

  getBill.$inject = ['$stateParams', 'BillService'];

  function getBill($stateParams, BillService) {
    return BillService.get({
      billId: $stateParams.billId
    }).$promise;
  }

  newBill.$inject = ['BillService'];

  function newBill(BillService) {
    return new BillService();
  }
}());
