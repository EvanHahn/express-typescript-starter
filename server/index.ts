import * as express from 'express'

const app = express()

app.set('port', process.env.PORT || 3000)

app.use(function (req, res) {
  res.send('Hello world!')
})

if (require.main === module) {
  app.listen(app.get('port'), () => {
    console.log('App started on port ' + app.get('port'))
  })
}

module.exports = app
