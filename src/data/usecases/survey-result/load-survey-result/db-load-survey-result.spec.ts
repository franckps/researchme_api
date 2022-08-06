import { LoadSurveyResultRepository } from './db-load-survey-result-protocols';
import { DbLoadSurveyResult } from './db-load-survey-result';
import { mockLoadSurveyResultRepository } from '@/data/test';

type SutTypes = {
  sut: DbLoadSurveyResult;
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository;
};

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository();
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub);
  return {
    sut,
    loadSurveyResultRepositoryStub,
  };
};

describe('DbLoadSurveyResult Usecase', () => {
  test('Should call LoadSurveyResultRepository', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    const loadBySurveyIdSpy = jest.spyOn(
      loadSurveyResultRepositoryStub,
      'loadBySurveyId'
    );
    await sut.load('any_surveyId');
    expect(loadBySurveyIdSpy).toBeCalledWith('any_surveyId');
  });
});
