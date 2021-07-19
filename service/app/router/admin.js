const { route } = require("next/dist/next-server/server/router");

module.exports = app => {
  const {router, controller} = app;
  const adminAuth = app.middleware.adminAuth();
  router.post('/admin/checkLogin', controller.admin.main.checkLogin)
  router.get('/admin/getTypeInfo', adminAuth, controller.admin.main.getTypeInfo)
}