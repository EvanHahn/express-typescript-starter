import * as gulp from 'gulp'

import './tasks/clean'
import './tasks/env'
import './tasks/app'
import './tasks/test'

gulp.task('start', ['env.production', 'app.start'])
gulp.task('build', ['env.production', 'app.build'])
gulp.task('development', ['env.development', 'app.development'])
gulp.task('test', ['env.test', 'test.lint', 'test.run'])

gulp.task('t', ['test'])
