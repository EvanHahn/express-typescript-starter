const gulp = require('gulp')
const tasks = {
  server: require('./tasks/server')
}

gulp.task('server.build', tasks.server.build)
gulp.task('server.stop', tasks.server.stop)
gulp.task('server.start', ['server.stop', 'server.build'], tasks.server.start)
gulp.task('server.development', ['server.start'], tasks.server.development)

gulp.task('start', ['server.start'])
gulp.task('development', ['server.development'])
