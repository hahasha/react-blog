const Controller = require('egg').Controller;

class MainController extends Controller {
  async checkLogin() {
    let userName = this.ctx.request.body.userName
    let password = this.ctx.request.body.password
    const sql = `SELECT userName FROM admin_user WHERE userName = '${userName}' AND password = '${password}'`
    const res = await this.app.mysql.query(sql)
    if(res.length > 0) {
      let openId = new Date().getTime()
      this.ctx.session.openId = { 'openId': openId }
      this.ctx.body = {
        data: '登录成功',
        openId
      }
    } else {
      this.ctx.body = {
        data: '登录失败'
      }
    }
  }
  // 获取文章类别
  async getTypeInfo() {
    const res = await this.app.mysql.select('type');
    this.ctx.body = {
      data: res
    }
  }
}

module.exports = MainController;