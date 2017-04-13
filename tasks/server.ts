import * as gulp from 'gulp'
import * as path from 'path'
import * as ts from 'gulp-typescript'
import * as childProcess from 'child_process'

const ROOT = path.join(__dirname, '..')
const TS_CONFIG = path.join(ROOT, 'tsconfig.json')
const TS_FILES = path.join(ROOT, 'server', '**/*.ts')
const DIST = path.join(ROOT, 'dist', 'server')
const BUILT_JS = path.join(DIST, 'index.js')

let proc: childProcess.ChildProcess
const tsProject = ts.createProject(TS_CONFIG)

gulp.task('server.build', function () {
  return gulp.src(TS_FILES)
    .pipe(tsProject())
    .on('error', function () {
      if (process.env.NODE_ENV === 'production') {
        process.exit(1)
      }
    })
    .js.pipe(gulp.dest(DIST))
})

gulp.task('server.stop', function (done: () => any) {
  if (proc) {
    proc.on('exit', () => { done() })
    proc.kill()
  } else {
    done()
  }
})

gulp.task('server.start', ['server.stop', 'server.build'], function () {
  proc = childProcess.fork(BUILT_JS)
})

gulp.task('server.development', ['server.start'], function () {
  gulp.watch(TS_FILES, ['server.start'])
})
