import * as gulp from 'gulp'

import './tasks/clean'
import './tasks/env'
import './tasks/server'
import './tasks/test'

gulp.task('start', ['env.production', 'server.start'])
gulp.task('development', ['env.development', 'server.development'])
