import * as gulp from 'gulp'
import * as path from 'path'

import './start-stop'
import { SERVER_FILES_SRC } from './build-server'
import { PUBLIC_FILES_SRC } from './build-public'
import { JAVASCRIPT_ASSET_FILES_SRC } from './build-assets'
import { VIEW_FILES_SRC } from './build-views'

gulp.task('app.build', [
  'app.build.server',
  'app.build.assets',
  'app.build.public',
  'app.build.views'
])

gulp.task('app.development', ['app.start'], function () {
  gulp.watch(SERVER_FILES_SRC, ['app.restart'])
  gulp.watch(JAVASCRIPT_ASSET_FILES_SRC, ['app.build.assets.javascripts'])
  gulp.watch(PUBLIC_FILES_SRC, ['app.build.public'])
  gulp.watch(VIEW_FILES_SRC, ['app.build.views'])
})
