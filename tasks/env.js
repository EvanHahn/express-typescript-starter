module.exports = ['development', 'test', 'production'].reduce(function (result, env) {
  result[env] = function () {
    process.env.NODE_ENV = env
  }
  return result
}, {})