/**
 * Created by jcwang on 2017/3/14.
 */
(function (app) {
  'use strict';

  app.registerModule('bills', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('bills.admin', ['core.admin']);
  app.registerModule('bills.admin.routes', ['core.admin.routes']);
  app.registerModule('bills.services');
  app.registerModule('bills.routes', ['ui.router', 'core.routes', 'bills.services']);
}(ApplicationConfiguration));
