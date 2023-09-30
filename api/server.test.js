// Write your tests here
const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server')
const Auth = require('./auth/auth-model')

const user1 = {username:'Batman', password:1234}
const user2 = {username:'Joker', password:1234}

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})


test('sanity', () => {
  expect(true).toBe(true)
})

it('correct env', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})

describe('[POST] /api/auth/register', () => {
  const user3 = {username:'Batman', password:"1234"}
  test('adds username to db', async () => {
    const res = await request(server).post('/api/auth/register').send(user3)
    expect(res.status).toBe(201)
  })
  test('throws an 401 if it gets an incomplete registry', async () => {
    const res = await request(server).post('/api/auth/register').send({username:'Tony'})
    expect(res.status).toBe(401)
  })
})

describe('[POST] /api/auth/login', () => {
  const user4 = {username:'Robuin', password:"1234"}
  test('checks for the username if it exists', async() => {
    await request(server).post('/api/auth/register').send(user4)

    const res = await request(server).post("/api/auth/login").send(user4)
    expect(res.status).toBe(200)
  })

  test('check if it is wrong', async() => {
    const res = await request(server).post("/api/auth/login").send({username:'Juan', password:'hehe'})
    expect(res.status).toBe(401)
  })
})