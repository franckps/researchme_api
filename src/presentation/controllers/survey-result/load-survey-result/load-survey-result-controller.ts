import { InvalidParamError } from '@/presentation/errors';
import {
  forbidden,
  serverError,
} from '@/presentation/helpers/http/http-helper';
import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadSurveyById,
  LoadSurveyResult,
} from './load-survey-result-controller-protocols';

export class LoadSurveyResultController implements Controller {
  constructor(
    private readonly loadSurveyById: LoadSurveyById,
    private readonly loadSurveyResult: LoadSurveyResult
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params;
      const survey = await this.loadSurveyById.loadById(surveyId);
      await this.loadSurveyResult.load(surveyId);
      if (!survey) return forbidden(new InvalidParamError('surveyId'));
      return null;
    } catch (err) {
      return serverError(err);
    }
  }
}
