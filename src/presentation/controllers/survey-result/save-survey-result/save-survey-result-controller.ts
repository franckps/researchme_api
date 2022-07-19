import { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../login/login/login-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const { answer } = httpRequest.body
      const survey = await this.loadSurveyById.loadById(surveyId)
      if (survey) {
        const answers = survey.answers.map(a => a.answer)
        if (!answers.includes(answer)) { return forbidden(new InvalidParamError('answer')) }
      } else {
        return forbidden(new InvalidParamError('surveyId'))
      }
      return null
    } catch (err) {
      return serverError(err)
    }
  }
}
