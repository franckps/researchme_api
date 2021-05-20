import express from 'express'
import setUpMiadlewares from './middlewares'
import setUpRoutes from './routes'

const app = express()
setUpMiadlewares(app)
setUpRoutes(app)
export default app
