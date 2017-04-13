import * as gulp from 'gulp'

['development', 'production', 'test'].forEach((env) => {
  gulp.task('env.' + env, function () {
    process.env.NODE_ENV = env
  })
})
