import {
  SurveyResultModel,
  LoadSurveyResultRepository,
} from './db-load-survey-result-protocols';
import { DbLoadSurveyResult } from './db-save-survey-result';
import { mockSurveyResultModel } from '@/domain/test';

describe('DbLoadSurveyResult Usecase', () => {
  test('Should call LoadSurveyResultRepository', async () => {
    class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
      async loadBySurveyId(surveyId: string): Promise<SurveyResultModel> {
        return Promise.resolve(mockSurveyResultModel());
      }
    }
    const loadSurveyResultRepositoryStub = new LoadSurveyResultRepositoryStub();
    const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub);
    const loadBySurveyIdSpy = jest.spyOn(
      loadSurveyResultRepositoryStub,
      'loadBySurveyId'
    );
    await sut.load('any_surveyId');
    expect(loadBySurveyIdSpy).toBeCalledWith('any_surveyId');
  });
});
