import * as gulp from 'gulp'

import { JAVASCRIPT_ASSET_FILES_SRC as j } from './javascripts'
import { STYLESHEET_ASSET_FILES_SRC as s } from './stylesheets'

export const JAVASCRIPT_ASSET_FILES_SRC = j
export const STYLESHEET_ASSET_FILES_SRC = s

gulp.task('app.build.assets', ['app.build.assets.javascripts', 'app.build.assets.stylesheets'])
