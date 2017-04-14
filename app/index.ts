/// <reference path="../definitions/dns-prefetch-control.d.ts" />
/// <reference path="../definitions/frameguard.d.ts" />
/// <reference path="../definitions/ienoopen.d.ts" />
/// <reference path="../definitions/dont-sniff-mimetype.d.ts" />
/// <reference path="../definitions/referrer-policy.d.ts" />
/// <reference path="../definitions/x-xss-protection.d.ts" />

import * as express from 'express'
import * as path from 'path'
import * as morgan from 'morgan'
import * as dnsPrefetchControl from 'dns-prefetch-control'
import * as frameguard from 'frameguard'
import * as ieNoOpen from 'ienoopen'
import * as noSniff from 'dont-sniff-mimetype'
import * as referrerPolicy from 'referrer-policy'
import * as xssFilter from 'x-xss-protection'

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
app.use(frameguard({ action: 'sameorigin' }))
app.use(ieNoOpen())
app.use(noSniff())
app.use(referrerPolicy({ policy: 'no-referrer' }))
app.use(xssFilter())

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
