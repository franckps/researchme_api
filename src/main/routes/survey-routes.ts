import { Router } from 'express'
import { adaptMiddleware } from '../adapters/express/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey-controller-factory'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware())
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
}
