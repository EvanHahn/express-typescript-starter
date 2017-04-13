/// <reference path="../definitions/gulp-ava.d.ts" />

import * as path from 'path'
import * as gulp from 'gulp'
import * as tslint from 'tslint'
import * as ts from 'gulp-typescript'
import * as ava from 'gulp-ava'
import gulpTslint from 'gulp-tslint'

const ROOT = path.join(__dirname, '..')
const TS_CONFIG = path.join(ROOT, 'tsconfig.json')
const TSLINT_PATH = path.join(ROOT, 'tslint.json')
const UNIT_TEST_FILES = path.join(ROOT, 'test', 'unit', '**/*.ts')
const TS_FILES: string[] = [
  path.join(ROOT, 'gulpfile.ts'),
  path.join(ROOT, 'tasks', '**/*.ts'),
  path.join(ROOT, 'server', '**/*.ts'),
  path.join(ROOT, 'client', '**/*.ts'),
  path.join(ROOT, 'test', '**/*.ts')
]
const DIST_UNIT = path.join(ROOT, 'dist', 'test', 'unit')
const DIST_UNIT_TESTS = path.join(DIST_UNIT, '**/*.js')

const tsProject = ts.createProject(TS_CONFIG)

export function lint () {
  const program = tslint.Linter.createProgram(TSLINT_PATH)

  return gulp.src(TS_FILES)
    .pipe(gulpTslint({ program }))
    .pipe(gulpTslint.report())
}

export function buildUnit () {
  return gulp.src(UNIT_TEST_FILES)
    .pipe(tsProject())
    .js.pipe(gulp.dest(DIST_UNIT))
}

export function unit () {
  return gulp.src(DIST_UNIT_TESTS)
    .pipe(ava())
}
