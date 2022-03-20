import express, { Express, urlencoded, json, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import Environment from '@Config/environment';
import UsersRoutes from '@Routes/users.routes';
import UsersController from '@Controllers/users.controller';
import pkg from '../package.json';

const app: Express = express();
const environment = new Environment();
const userRoutes = new UsersRoutes(new UsersController());

// settings
app.set('port', environment.PORT);
app.set('pkg', pkg);

// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());

// mapped routes
app.use('/api/users', userRoutes.initialize());

app.get('/', async (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Example api',
    name: app.get('pkg').name,
    version: app.get('pkg').version,
    description: app.get('pkg').description,
    author: app.get('pkg').author,
  });
});

export default app;