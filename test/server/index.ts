import test from 'ava'
import app from '../../server'

test(function disablesXPoweredBy (t) {
  t.true(app.disabled('x-powered-by'))
})
