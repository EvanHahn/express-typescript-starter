import * as gulp from 'gulp'
import * as fs from 'fs'
import { join } from 'path'

const ROOT = join(__dirname, '..', '..')
const PACKAGE_JSON_SRC = join(ROOT, 'package.json')
const PACKAGE_JSON_DIST = join(ROOT, 'dist', 'app', 'package.json')

gulp.task('app.build.packagejson', function (done: (err?: Error) => any) {
  fs.readFile(PACKAGE_JSON_SRC, 'utf8', (err, data) => {
    if (err) { return done(err) }

    const pkg = JSON.parse(data)

    const result = {
      name: pkg.name,
      private: true,
      scripts: {
        start: 'node index'
      },
      dependencies: pkg.dependencies
    }

    fs.writeFile(PACKAGE_JSON_DIST, JSON.stringify(result, null, 2), done)
  })
})
