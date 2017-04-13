import * as path from 'path'
import * as gulp from 'gulp'
import * as tslint from 'tslint'
import gulpTslint from 'gulp-tslint'

const ROOT = path.join(__dirname, '..')
const TSLINT_PATH = path.join(ROOT, 'tslint.json')
const TS_FILES: string[] = [
  path.join(ROOT, 'gulpfile.ts'),
  path.join(ROOT, 'tasks', '**/*.ts'),
  path.join(ROOT, 'server', '**/*.ts'),
  path.join(ROOT, 'client', '**/*.ts')
]

export function lint () {
  const program = tslint.Linter.createProgram(TSLINT_PATH)

  return gulp.src(TS_FILES)
    .pipe(gulpTslint({ program }))
    .pipe(gulpTslint.report())
}
