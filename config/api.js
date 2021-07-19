let baseUrl = 'http://127.0.0.1:7001/default/'

let api = {
  getArticleList: baseUrl + 'getArticleList', // 获取首页文章列表
  getArticleById: baseUrl + 'getArticleById?id=', // 获取文章详情
  getTypeInfo: baseUrl + 'getTypeInfo', // 获取分类信息
  getListById: baseUrl + 'getListById?id=' // 获取分类列表
}

export default api;