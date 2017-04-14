/// <reference path="../../definitions/gulp-ava.d.ts" />

import * as path from 'path'
import * as gulp from 'gulp'
import * as ts from 'gulp-typescript'
import * as ava from 'gulp-ava'

const ROOT = path.join(__dirname, '..', '..')
const TS_CONFIG = path.join(ROOT, 'tsconfig.json')
const TEST_FILES = path.join(ROOT, 'test', '**/*.ts')
const FILES_AFFECTED_BY_TESTS: string[] = [
  path.join(ROOT, 'package.json'),
  path.join(ROOT, 'app', '**/*.ts'),
  path.join(ROOT, 'test', '**/*.ts')
]
const DIST_TEST_PATH = path.join(ROOT, 'dist', 'test')
const DIST_TEST_FILES = path.join(DIST_TEST_PATH, '**/*.js')

const tsProject = ts.createProject(TS_CONFIG)

gulp.task('test.build', ['env.test', 'clean', 'app.build'], function () {
  return gulp.src(TEST_FILES)
    .pipe(tsProject())
    .js.pipe(gulp.dest(DIST_TEST_PATH))
})

gulp.task('test.watch', ['env.test', 'test'], function () {
  gulp.watch(FILES_AFFECTED_BY_TESTS, ['test'])
})

gulp.task('test.run', ['env.test', 'test.build'], function () {
  return gulp.src(DIST_TEST_FILES).pipe(ava())
})
