import express from 'express'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const app = express()

const PORT = 3000

app.use(express.json())


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
  console.log(`Server is running on port ${PORT}`)
})
