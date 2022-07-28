import express from 'express';
import setUpMiadlewares from './middlewares';
import setUpRoutes from './routes';
import setUpSwagger from './config-swagger';

const app = express();
setUpSwagger(app);
setUpMiadlewares(app);
setUpRoutes(app);
export default app;
