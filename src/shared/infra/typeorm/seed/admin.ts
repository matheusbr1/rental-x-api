import { v4 as uuidv4 } from 'uuid'
import createConnection from '../index'

async function create() {
  const connection = await createConnection('localhost')

  const id = uuidv4()
  const password = 'admin'

  await connection.query(`
    INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      values('${id}', 'admin', 'email@admin.com.br', '${password}', true, 'now()', 'xxxxxx')
  `)

  await connection.close();
}

create().then(() => console.log('User admin created'))