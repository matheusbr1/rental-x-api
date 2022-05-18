import request from 'supertest'
import { v4 as uuidv4 } from 'uuid'

import { app } from '@shared/infra/http/app'

import createConnection from '@shared/infra/typeorm'
import { Connection } from 'typeorm'

let connection: Connection

describe('List Categories Controller', () => {
  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()

    const id = uuidv4()
    const password = 'admin'

    await connection.query(`
      INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
        values('${id}', 'admin', 'email@admin.com.br', '${password}', true, 'now()', 'xxxxxx')
    `)
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it.skip('should be able to list all categories', async () => {
    const responseToken = await request(app).post('/sessions')
      .send({
        email: 'email@admin.com.br',
        password: 'admin'
      })

    const token = responseToken.body.token

    await request(app)
      .post('/categories')
      .send({
        name: 'Category Supertest',
        description: 'Category Supertest'
      }).set({
        Authorization: 'Bearer ' + token
      })

      const response = await request(app).get('/categories')

      expect(response.status).toBe(200)
      expect(response.body.length).toBe(1)
      expect(response.body[0]).toHaveProperty('id')
      expect(response.body[0].name).toHaveProperty('Category Supertest')
  })
})