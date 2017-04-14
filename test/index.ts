import test from 'ava'
import * as supertest from 'supertest'
import app from '../app'

test(function disablesXPoweredBy (t) {
  t.true(app.disabled('x-powered-by'))
})

test(async function servesHtmlAtRoot (t) {
  const res = await supertest(app).get('/')
  t.is(res.status, 200)
  t.regex(res.get('Content-Type'), /html/)
})

test(async function servesRobotsTxt (t) {
  const res = await supertest(app).get('/robots.txt')
  t.is(res.status, 200)
  t.regex(res.get('Content-Type'), /text\/plain/)
})
