import * as gulp from 'gulp'
import * as path from 'path'
import * as ts from 'gulp-typescript'
import { fork } from 'child_process'

const ROOT = path.join(__dirname, '..')
const TS_CONFIG = path.join(ROOT, 'server', 'tsconfig.json')
const TS_FILES = path.join(ROOT, 'server', '**/*.ts')
const DIST = path.join(ROOT, 'dist')
const BUILT_JS = path.join(DIST, 'index.js')

let proc = null
const tsProject = ts.createProject(TS_CONFIG)

export function build () {
  return gulp.src(TS_FILES)
    .pipe(tsProject())
    .on('error', function () {
      if (process.env.NODE_ENV === 'production') {
        process.exit(1)
      }
    })
    .js.pipe(gulp.dest(DIST))
}

export function stop (done) {
  if (proc) {
    proc.on('exit', () => { done() })
    proc.kill()
  } else {
    done()
  }
}

export function start () {
  proc = fork(BUILT_JS)
}

export function development () {
  gulp.watch(TS_FILES, ['server.start'])
}

function noop () {}