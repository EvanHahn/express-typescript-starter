import * as gulp from 'gulp'
import * as rimraf from 'rimraf'
import { join } from 'path'

const ROOT = join(__dirname, '..')
const DIST = join(ROOT, 'dist')

gulp.task('clean', function () {
  rimraf.sync(DIST)
})
