const gulp = require('gulp')
const path = require('path')
const ts = require('gulp-typescript')
const fork = require('child_process').fork

const ROOT = path.join(__dirname, '..')
const TS_CONFIG = path.join(ROOT, 'server', 'tsconfig.json')
const TS_FILES = path.join(ROOT, 'server', '**/*.ts')
const DIST = path.join(ROOT, 'dist')
const BUILT_JS = path.join(DIST, 'index.js')

let proc = null
const tsProject = ts.createProject(TS_CONFIG)

function build () {
  return gulp.src(TS_FILES)
    .pipe(tsProject())
    .js.pipe(gulp.dest(DIST))
}

function stop (done) {
  if (proc) {
    proc.on('exit', () => { done() })
    proc.kill()
  } else {
    done()
  }
}

function start () {
  proc = fork(BUILT_JS, {
    silent: false
  })
}

function development () {
  gulp.watch(TS_FILES, ['server.start'])
}

module.exports = { build, stop, start, development }

function noop () {}