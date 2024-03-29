import {
  SurveyResultModel,
  SurveyResultParams,
} from '@/domain/models/survey-result';
import { AddSurveyParams } from '../usecases/survey/add-survey';

export const mockSurveyResultModel = (): SurveyResultModel => ({
  surveyId: 'any_id',
  question: 'any_question',
  answers: [
    {
      answer: 'any_answer',
      count: 0,
      percent: 0,
    },
    {
      answer: 'other_answer',
      image: 'any_image',
      count: 0,
      percent: 0,
    },
  ],
  date: new Date(),
});

export const mockSaveSurveyResultParams = (): SurveyResultParams => ({
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
