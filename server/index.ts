import * as express from 'express'
import * as path from 'path'

const STATIC_FILES_PATH: string = path.join(__dirname, 'public')
const VIEWS_PATH: string = path.join(__dirname, 'views')
const PORT: number = process.env.PORT || 3000

const app = express()

app.disable('x-powered-by')
app.set('views', VIEWS_PATH)
app.set('view engine', 'pug')

app.use(express.static(STATIC_FILES_PATH))

app.get('/', function (req, res) {
  res.render('index')
})

if (require.main === module) {
  app.listen(PORT, () => {
    console.log('App started in ' + app.get('env') + ' mode on port ' + PORT)
  })
}

export default app
