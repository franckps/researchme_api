import { SurveyResultModel } from '@/domain/models/survey-result';
import { AddSurveyParams } from '../usecases/survey/add-survey';

export const mockSurveyResultModel = (): SurveyResultModel =>
  Object.assign({}, mockSaveSurveyResultParams(), { id: 'any_id' });

export const mockSaveSurveyResultParams = (): Omit<
  SurveyResultModel,
  'id'
> => ({
  accountId: 'any_account_id',
  surveyId: 'any_account_id',
  answer: 'any_answer',
  date: new Date(),
});

export const mockSurveyParams = (): AddSurveyParams => ({
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer',
    },
  ],
  date: new Date(),
});
