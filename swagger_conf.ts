const swaggerAutogen = require("swagger-autogen");
import * as dotenv from 'dotenv'
dotenv.config();


const HOST = process.env.SERVER_HOST ?? "http://localhost:3003"

const outputFile = `./docs/swagger_docs.json`


const endpointsFiles =["./src/routes/index.ts"];

const doc = {
    info: {
        version: "1.0.0",
        title: "Blog API",
        description: "Documentation automatically generated."

    },
    host: HOST,
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
}

// enable this to run from the command line
// swaggerAutogen(outputFile,endpointsFiles,doc);
const runAutogen = () => swaggerAutogen(outputFile,endpointsFiles,doc);
export default runAutogen;