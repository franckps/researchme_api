import express from 'express'
import setUpMiadlewares from './middlewares'

const app = express()
setUpMiadlewares(app)
export default app
