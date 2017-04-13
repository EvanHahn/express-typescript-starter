import * as gulp from 'gulp'
import * as envTasks from './tasks/env'

const tasks = {
  server: require('./tasks/server')
}

gulp.task('env.development', envTasks.development)
gulp.task('env.test', envTasks.test)
gulp.task('env.production', envTasks.production)

gulp.task('server.build', tasks.server.build)
gulp.task('server.stop', tasks.server.stop)
gulp.task('server.start', ['server.stop', 'server.build'], tasks.server.start)
gulp.task('server.development', ['server.start'], tasks.server.development)

gulp.task('start', ['env.production', 'server.start'])
gulp.task('development', ['env.development', 'server.development'])
