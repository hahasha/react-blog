module.exports = options => {
  return async function adminAuth(ctx, next) {
    if (ctx.session.openId) {
      await next()
    } else {
      ctx.body = {
        data: '没有登录'
      }
    }
  }
}