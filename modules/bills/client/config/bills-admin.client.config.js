/**
 * Created by jcwang on 2017/3/14.
 */
(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('bills.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Bills',
      state: 'admin.bills.list'
    });
  }
}());
