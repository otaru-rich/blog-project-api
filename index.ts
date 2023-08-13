import express from 'express'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { route } from './src/routes'
import * as dotenv from 'dotenv'
import { logger } from './src/utils/logger'
import startUpDb from './src/config/database'
const serverless = require('serverless-http');

const app = express()

/**
 * DB configuration init
 */
startUpDb()

dotenv.config()

app.use(express.json())

const PORT = process.env.PORT ?? 3003

route(app)
// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog Project API',
      version: '1.0.0'
    }
  },
  apis: ['./src/routes/*.ts']
}

const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

if (process.env.ENVIRONMENT === 'production') {
  exports.handler = serverless(app);
} else {
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`)
  })
}