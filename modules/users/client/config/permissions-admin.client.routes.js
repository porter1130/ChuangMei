/**
 * Created by jcwang on 2017/3/16.
 */
(function(){
  'use strict';

  angular
    .module('permissions.admin.routes')
    .config(routeConfig);

  routeConfig.$inject=['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.permissions', {
        abstract: true,
        url: '/bills',
        template: '<ui-view/>'
      });
  }

}());
