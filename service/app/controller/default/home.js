const Controller = require('egg').Controller;

class HomeController extends Controller {
  // 获取首页文章列表
  async getArticleList() {
    let sql = `SELECT article.id as id,
      article.title as title,
      article.introduce as introduce,
      article.view_count as viewCount,
      DATE_FORMAT(article.create_time, "%Y-%m-%d %H:%i:%s") as createTime,
      type.typeName as typeName
      From article LEFT JOIN type ON article.type_id = type.id
    `
    const list = await this.app.mysql.query(sql)
    this.ctx.body = {
      data: list
    }
  }

  // 获取文章详情
  async getArticleById() {
    let id = this.ctx.query.id
    let sql = `SELECT article.id as id,
      article.title as title,
      article.introduce as introduce,
      article.view_count as viewCount,
      article.content as content,
      article.type_id as typeId,
      DATE_FORMAT(article.create_time, "%Y-%m-%d %H:%i:%s") as createTime,
      type.typeName as typeName
      From article LEFT JOIN type ON article.type_id = type.id
      WHERE article.id = ${id}
    `
    const detail = await this.app.mysql.query(sql)
    this.ctx.body = {
      data: detail
    }
  }

  // 获取类别信息
  async getTypeInfo() {
    const result = await this.app.mysql.select('type')
    this.ctx.body = {
      data: result
    }
  }

  // 获取分类列表
  async getListById() {
    const id = this.ctx.query.id
    let sql = `SELECT article.id as id,
      article.title as title,
      article.introduce as introduce,
      article.view_count as viewCount,
      DATE_FORMAT(article.create_time, "%Y-%m-%d %H:%i:%s") as createTime,
      type.typeName as typeName
      From article LEFT JOIN type ON article.type_id = type.id
      WHERE article.type_id = ${id}
    `
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {
      data: result
    }
  }
}

module.exports =  HomeController;