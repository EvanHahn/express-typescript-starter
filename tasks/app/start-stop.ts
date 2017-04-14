import * as gulp from 'gulp'
import { join } from 'path'
import * as childProcess from 'child_process'

const ROOT = join(__dirname, '..', '..')
const DIST = join(ROOT, 'dist')
const BUILT_MAIN = join(DIST, 'app', 'index.js')

let proc: childProcess.ChildProcess

gulp.task('app.stop', function (done: () => any) {
  if (proc) {
    proc.on('exit', () => { done() })
    proc.kill()
  } else {
    done()
  }
})

gulp.task('app.restart', ['app.build.server', 'app.stop'], startServer)

gulp.task('app.start', ['app.build'], startServer)

function startServer () {
  proc = childProcess.fork(BUILT_MAIN)
}
