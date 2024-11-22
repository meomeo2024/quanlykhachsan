import express, { Request, Response } from 'express';
import "reflect-metadata";
import * as dotenv from "dotenv";
import { AppDataSource } from './src/database';
import { accountRouter } from './src/routers/account.router';
import { roomRouter } from './src/routers/room.router';
import session from "express-session";
import { initPassportStrategy } from './src/middleware/authentication/auth.strategy';
import { renterRouter } from './src/routers/renter.router';
import { billRouter } from './src/routers/bill.router';
import { InitDefaultDataBase } from './src/service/init-default-database.service';
import swaggerJsdoc from 'swagger-jsdoc';
const swaggerUi = require("swagger-ui-express");
dotenv.config();

const app = express();
// Configure the app to use Swagger

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hau Pham - Hotel Server API',
      version: '1.0.0',
      description: 'Server API built with TypeScript and Swagger',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          in: 'header',
          name: 'Authorization',
          description: 'Bearer Token',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routers/*.ts'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const port = 3000;
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET_KEY ?? 'session_secret',
  resave: false,
  saveUninitialized: false
}))
initPassportStrategy(app);

app.use('/api/account', accountRouter);
app.use('/api/room', roomRouter);
app.use('/api/renter', renterRouter);
app.use('/api/bill', billRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
})


AppDataSource.initialize()
  .then(async () => {
    app.listen(port, async () => {
      // init default database
      await InitDefaultDataBase.initDataTable()
      console.log("Server is running on http://localhost:" + port);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));