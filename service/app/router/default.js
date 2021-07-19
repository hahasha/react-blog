module.exports = app => {
  const { router, controller } = app
  router.get('/default/getArticleList', controller.default.home.getArticleList)
  router.get('/default/getArticleById', controller.default.home.getArticleById)
  router.get('/default/getTypeInfo', controller.default.home.getTypeInfo)
  router.get('/default/getListById', controller.default.home.getListById)
}