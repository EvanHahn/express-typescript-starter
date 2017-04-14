import * as gulp from 'gulp'
import { join } from 'path'

const ROOT = join(__dirname, '..', '..')
export const PUBLIC_FILES_SRC = join(ROOT, 'app', 'public', '**/**')
const PUBLIC_DIR_DIST = join(ROOT, 'dist', 'app', 'public')

gulp.task('app.build.public', function () {
  return gulp.src(PUBLIC_FILES_SRC).pipe(gulp.dest(PUBLIC_DIR_DIST))
})
