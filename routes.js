const routes = require('next-routes')();

routes
  .add('/memberships/new', '/memberships/new')
  .add('/memberships/:address', '/memberships/show')
//  .add('/campaigns/:address/requests', '/campaigns/requests/index')
//  .add('/campaigns/:address/requests/new', '/campaigns/requests/new');

module.exports = routes;
