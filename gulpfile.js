const gulp = require('gulp')
const tasks = {
  env: require('./tasks/env'),
  server: require('./tasks/server')
}

gulp.task('env.development', tasks.env.development)
gulp.task('env.test', tasks.env.test)
gulp.task('env.production', tasks.env.production)

gulp.task('server.build', tasks.server.build)
gulp.task('server.stop', tasks.server.stop)
gulp.task('server.start', ['server.stop', 'server.build'], tasks.server.start)
gulp.task('server.development', ['server.start'], tasks.server.development)

gulp.task('start', ['env.production', 'server.start'])
gulp.task('development', ['env.development', 'server.development'])
