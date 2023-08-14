import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { route } from './src/routes'
import * as dotenv from 'dotenv'
import startUpDb from './src/config/database'
import runAutogen from "./swagger_conf";
const serverless = require('serverless-http');

const app = express()

/**
 * DB configuration init
 */
startUpDb().then(() => {
  console.log('Database connected');
});

dotenv.config()

app.use(express.json())

const PORT = process.env.PORT ?? 3003

route(app)
// a temporary solution to generate docs
if (process.env.GEN_DOCS === 'true') {
  console.log('Generating...');
  const gen = runAutogen();
  const waitFor = (time_mills:number) => new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, time_mills);
  });
  waitFor(5000).then(() => {
    console.log('Docs generated');
  });
}

const swaggerDocs = require('./swagger_docs.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
if (process.env.ENVIRONMENT === 'production') {
  exports.handler = serverless(app);
  console.log(`Server is running on production port ${PORT}`)
} else {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}


