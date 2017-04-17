import * as gulp from 'gulp'
import { join } from 'path'
import * as ts from 'gulp-typescript'

const ROOT = join(__dirname, '..', '..')
const TS_CONFIG = join(ROOT, 'tsconfig.json')
export const SERVER_FILES_SRC: string[] = [
  join(ROOT, 'app', '**/*.ts'),
  '!' + join(ROOT, 'app', 'assets', '**/*.ts')
]
const SERVER_DIR_DIST = join(ROOT, 'dist', 'app')

const tsProject = ts.createProject(TS_CONFIG)

gulp.task('app.build.server', function () {
  return gulp.src(SERVER_FILES_SRC)
    .pipe(tsProject())
    .on('error', function () {
      if (process.env.NODE_ENV === 'production') {
        process.exit(1)
      }
    })
    .js.pipe(gulp.dest(SERVER_DIR_DIST))
})
