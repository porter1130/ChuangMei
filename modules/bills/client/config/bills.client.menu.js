/**
 * Created by jcwang on 2017/3/14.
 */
(function () {
  'use strict';

  angular
    .module('bills')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Bills',
      state: 'bills',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'bills', {
      title: 'List Bills',
      state: 'bills.list',
      roles: ['*']
    });
  }
}());
