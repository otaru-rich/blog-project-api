import { createConnection } from 'typeorm'

import entities from '../models'

import * as dotenv from 'dotenv'
import {logger} from "../utils/logger";

const { Post, User } = entities

dotenv.config()

const { DB_USER_DEV, DB_PASSWORD_DEV, DB_NAME_DEV, DB_HOST_DEV } = process.env

class DBConfig {
  /**
     * @constructor
     */
  constructor () {
    this.dbConfig()
      .then(db => { logger.info('Database config completed...') })
        .catch(err => {logger.error('Database config Error...', err) });
  }

  /**
     * @async
     * @returns createConnection
     */
  dbConfig = async () => {
    return await createConnection({
      type: 'mysql',
      database: DB_NAME_DEV,
      username: DB_USER_DEV,
      password: DB_PASSWORD_DEV,
      host: DB_HOST_DEV,
      entities: [Post, User],
      logging: false,
      synchronize: true
    })
  }
}

const startUpDb = ():DBConfig =>new DBConfig();
export default startUpDb
