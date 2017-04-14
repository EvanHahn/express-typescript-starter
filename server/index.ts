import * as express from 'express'
import * as path from 'path'

const STATIC_FILES_PATH: string = path.join(__dirname, 'public')
const PORT: number = process.env.PORT || 3000

const app = express()

app.disable('x-powered-by')

app.use(express.static(STATIC_FILES_PATH))

app.use(function (req, res) {
  res.send('Hello world!')
})

if (require.main === module) {
  app.listen(PORT, () => {
    console.log('App started in ' + app.get('env') + ' mode on port ' + PORT)
  })
}

export default app
