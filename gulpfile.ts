import * as gulp from 'gulp'

import './tasks/env'
import './tasks/server'
import './tasks/test'

gulp.task('start', ['env.production', 'server.start'])
gulp.task('development', ['env.development', 'server.development'])
gulp.task('test', ['test.lint', 'test.unit'])
