import * as gulp from 'gulp'
import { join } from 'path'

const ROOT = join(__dirname, '..', '..')
export const VIEW_FILES_SRC = join(ROOT, 'app', 'views', '**/**')
const VIEWS_DIR_DIST = join(ROOT, 'dist', 'app', 'views')

gulp.task('app.build.views', function () {
  return gulp.src(VIEW_FILES_SRC).pipe(gulp.dest(VIEWS_DIR_DIST))
})
