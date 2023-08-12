import swaggerJsDoc, { type Options } from 'swagger-jsdoc'
import * as dotenv from 'dotenv'
import * as routes from './routes'
const SERVER_HOST = process.env.SERVER_HOST ?? 'http://localhost:3003'

dotenv.config()
const swaggerOptions: Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog Project API Documentation',
      version: '1.0.0',
      description: 'API documentation for blog project'
    },
    servers: [
      {
        url: `${SERVER_HOST}`
      }
    ]
  },
  apis: ['./routes/*.ts'] // Path to your route files
}
const swaggerSpec = swaggerJsDoc(swaggerOptions)
export default swaggerSpec

// const swaggerSpec = swaggerJsDoc(swaggerOptions)
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
