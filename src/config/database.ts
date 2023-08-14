import { createConnection } from 'typeorm'
import entities from './../models'
import * as dotenv from 'dotenv'

const { Post, User } = entities

dotenv.config()

const { DB_USER_DEV, DB_PASSWORD_DEV, DB_NAME_DEV, DB_HOST_DEV, DB_PORT_DEV } = process.env
const port = parseInt(DB_PORT_DEV ?? '3306', 10)

class DBConfig {
  /**
     * @constructor
     */
  constructor () {
    this.dbConfig()
      .then(db => { console.log('Database config completed...') })
      .catch(err => {
        console.log(`Database config Error...`, err)
        console.log(`Database config DB_USER_DEV...`, DB_USER_DEV)
        console.log(`Database config DB_PASSWORD_DEV...`, DB_PASSWORD_DEV)
        console.log(`Database config DB_NAME_DEV...`, DB_NAME_DEV)
        console.log(`Database config DB_HOST_DEV...`, DB_HOST_DEV)
        console.log(`Database config DB_PORT_DEV...`, DB_PORT_DEV)
      })
  }

  /**
     * @async
     * @returns createConnection
     */
  dbConfig = async () => {
    return await createConnection({
      type: 'mysql',
      port: port,
      database: DB_NAME_DEV,
      username: DB_USER_DEV,
      password: DB_PASSWORD_DEV,
      host: DB_HOST_DEV,
      entities: [Post, User],
      logging: false,
      synchronize: true,

    })
  }
}

const startUpDb = async  () => await  new DBConfig()
export default startUpDb
