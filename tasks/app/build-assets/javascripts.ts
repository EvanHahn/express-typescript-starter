/// <reference path="../../../definitions/rollup.d.ts" />
/// <reference path="../../../definitions/rollup-plugin-typescript.d.ts" />

import * as gulp from 'gulp'
import { rollup } from 'rollup'
import * as rollupTypescript from 'rollup-plugin-typescript'
import { join } from 'path'

const ROOT = join(__dirname, '..', '..', '..')
const TS_CONFIG = join(ROOT, 'tsconfig.json')
const JAVASCRIPT_ASSET_MAIN_SRC = join(ROOT, 'app', 'assets', 'javascripts', 'index.ts')
export const JAVASCRIPT_ASSET_FILES_SRC: string = join(ROOT, 'app', 'assets', 'javascripts', '**/*.ts')
const JAVASCRIPT_ASSET_MAIN_DIST = join(ROOT, 'dist', 'app', 'assets', 'javascripts', 'index.js')

gulp.task('app.build.assets.javascripts', function () {
  return rollup({
    entry: JAVASCRIPT_ASSET_MAIN_SRC,
    plugins: [rollupTypescript({
      typescript: require('typescript')
    })]
  })
    .then(function (bundle: any) {
      bundle.write({
        format: 'iife',
        dest: JAVASCRIPT_ASSET_MAIN_DIST,
        sourceMap: process.env.NODE_ENV !== 'production'
      })
    })
})
