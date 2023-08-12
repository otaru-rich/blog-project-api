import express from 'express'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { route } from './routes'
import * as dotenv from 'dotenv'
import { logger } from './utils/logger'
import startUpDb from './config/database'

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

const swaggerSpec = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`)
})
