import * as gulp from 'gulp'
import * as path from 'path'
import * as ts from 'gulp-typescript'
import * as childProcess from 'child_process'

const ROOT = path.join(__dirname, '..')
const TS_CONFIG = path.join(ROOT, 'tsconfig.json')
const TS_FILES = path.join(ROOT, 'server', '**/*.ts')
const PUBLIC_FILES = path.join(ROOT, 'server', 'public', '**/**')
const VIEW_FILES = path.join(ROOT, 'server', 'views', '**/**')
const DIST = path.join(ROOT, 'dist', 'server')
const DIST_PUBLIC = path.join(ROOT, 'dist', 'server', 'public')
const DIST_VIEWS = path.join(ROOT, 'dist', 'server', 'views')
const BUILT_JS = path.join(DIST, 'index.js')

let proc: childProcess.ChildProcess
const tsProject = ts.createProject(TS_CONFIG)

gulp.task('server.build.js', function () {
  return gulp.src(TS_FILES)
    .pipe(tsProject())
    .on('error', function () {
      if (process.env.NODE_ENV === 'production') {
        process.exit(1)
      }
    })
    .js.pipe(gulp.dest(DIST))
})

gulp.task('server.build.public', function () {
  return gulp.src(PUBLIC_FILES).pipe(gulp.dest(DIST_PUBLIC))
})

gulp.task('server.build.views', function () {
  return gulp.src(VIEW_FILES).pipe(gulp.dest(DIST_VIEWS))
})

gulp.task('server.build', ['server.build.js', 'server.build.public', 'server.build.views'])

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
  gulp.watch(PUBLIC_FILES, ['server.build.public'])
  gulp.watch(VIEW_FILES, ['server.build.views'])
})
