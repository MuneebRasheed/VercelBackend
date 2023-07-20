const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const loginRoute = require('./login.route');
const roleRoute = require('./role.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');
const tankRoute = require('./tank.route')
const dispenserRoute = require('./dispenser.route')
const nozelRoute = require('./nozel.route')
const productRoute = require('./product.route')
const supplierRoute = require('./supplier.route')
const carriageRoute = require('./carriage.route')
const dailydipRoute = require('./dailydip.route')
const dipchartRoute = require('./dipchart.route')
const customerRoute = require('./customer.route')
const salesmanRoute = require('./salesman.route')
const employeeRoute = require('./employee.route')
const purchaseRoute = require('./purchase.route')
const shiftRoute = require('./shift.route')
const saleRoute = require('./sale.route')
const saleReturnRoute = require('./sale_return.route')
const expire_brkgeRoute = require('./expire_brkge.route')
const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/login',
    route: loginRoute,
  },
  {
    path: '/roles',
    route: roleRoute,
  },
  {
    path: '/sale_return',
    route: saleReturnRoute,
  },
  {
    path: '/expire_brkge',
    route: expire_brkgeRoute,
  },
  {
    path: '/tank',
    route: tankRoute,
  },
  {
    path: '/dispenser',
    route: dispenserRoute,
  },
  {
    path: '/nozel',
    route: nozelRoute,
  },
  {
    path: '/product',
    route: productRoute,
  },
  {
    path: '/supplier',
    route: supplierRoute,
  },
  {
    path: '/salesman',
    route: salesmanRoute,
  },
  {
    path: '/shift',
    route: shiftRoute,
  },
  {
    path: '/carriage',
    route: carriageRoute,
  },
  {
    path: '/dailydip',
    route: dailydipRoute,
  },
  {
    path: '/dipchart',
    route: dipchartRoute,
  },
  {
    path: '/customer',
    route: customerRoute,
  },
  {
    path: '/employee',
    route: employeeRoute,
  },
  {
    path: '/purchase',
    route: purchaseRoute,
  },
  {
    path: '/sale',
    route: saleRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
