/// <reference path="../definitions/dns-prefetch-control.d.ts" />

import * as express from 'express'
import * as path from 'path'
import * as morgan from 'morgan'
import * as dnsPrefetchControl from 'dns-prefetch-control'

const STATIC_PATH: string = path.join(__dirname, 'public')
const ASSETS_PATH: string = path.join(__dirname, 'assets')
const VIEWS_PATH: string = path.join(__dirname, 'views')
const PORT: number = process.env.PORT || 3000

const app = express()

app.disable('x-powered-by')
app.set('views', VIEWS_PATH)
app.set('view engine', 'pug')

if (app.get('env') === 'development') {
  app.use(morgan('dev'))
} else if (app.get('env') === 'production') {
  app.use(morgan('combined'))
}

app.use('/assets', express.static(ASSETS_PATH))

app.use(dnsPrefetchControl())

app.use(express.static(STATIC_PATH))

app.get('/', function (req, res) {
  res.render('index')
})

if (require.main === module) {
  app.listen(PORT, () => {
    console.log('App started in ' + app.get('env') + ' mode on port ' + PORT)
  })
}

export default app
