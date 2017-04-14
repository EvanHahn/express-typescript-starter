import * as gulp from 'gulp'
import { join } from 'path'
import * as sass from 'gulp-sass'

const ROOT = join(__dirname, '..', '..', '..')
const STYLESHEET_ASSET_MAIN_SRC = join(ROOT, 'app', 'assets', 'stylesheets', 'index.scss')
export const STYLESHEET_ASSET_FILES_SRC = join(ROOT, 'app', 'assets', 'stylesheets', '**/*.scss')
const STYLESHEET_ASSET_DIR_DIST = join(ROOT, 'dist', 'app', 'assets', 'stylesheets')

gulp.task('app.build.assets.stylesheets', function () {
  return gulp.src(STYLESHEET_ASSET_MAIN_SRC)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest(STYLESHEET_ASSET_DIR_DIST))
})
