import * as gulp from 'gulp'
import * as envTasks from './tasks/env'
import * as serverTasks from './tasks/server'
import * as testTasks from './tasks/test'

gulp.task('env.development', envTasks.development)
gulp.task('env.test', envTasks.test)
gulp.task('env.production', envTasks.production)

gulp.task('server.build', serverTasks.build)
gulp.task('server.stop', serverTasks.stop)
gulp.task('server.start', ['server.stop', 'server.build'], serverTasks.start)
gulp.task('server.development', ['server.start'], serverTasks.development)

gulp.task('test.lint', testTasks.lint)
gulp.task('test.unit', ['test.unit.build'], testTasks.unit)
gulp.task('test.unit.build', ['server.build'], testTasks.buildUnit)

gulp.task('start', ['env.production', 'server.start'])
gulp.task('development', ['env.development', 'server.development'])
gulp.task('lint', ['test.lint'])
gulp.task('test', ['test.unit'])
