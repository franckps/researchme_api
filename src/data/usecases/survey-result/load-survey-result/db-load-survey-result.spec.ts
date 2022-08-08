import {
  LoadSurveyResultRepository,
  LoadSurveyByIdRepository,
} from './db-load-survey-result-protocols';
import { DbLoadSurveyResult } from './db-load-survey-result';
import {
  mockLoadSurveyByIdRepository,
  mockLoadSurveyResultRepository,
} from '@/data/test';
import { mockSurveyResultModel, throwError } from '@/domain/test';

type SutTypes = {
  sut: DbLoadSurveyResult;
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository;
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository;
};

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository();
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository();
  const sut = new DbLoadSurveyResult(
    loadSurveyResultRepositoryStub,
    loadSurveyByIdRepositoryStub
  );
  return {
    sut,
    loadSurveyResultRepositoryStub,
    loadSurveyByIdRepositoryStub,
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

  test('Should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    jest
      .spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
      .mockImplementationOnce(throwError);
    const promise = sut.load('any_surveyId');
    await expect(promise).rejects.toThrow();
  });

  test('Should call LoadSurveyByIdRepository if LoadSurveyResultRepository', async () => {
    const {
      sut,
      loadSurveyResultRepositoryStub,
      loadSurveyByIdRepositoryStub,
    } = makeSut();
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById');
    jest
      .spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
      .mockReturnValueOnce(Promise.resolve(null));
    await sut.load('any_surveyId');
    expect(loadByIdSpy).toHaveBeenCalledWith('any_surveyId');
  });

  test('Should return surveyResultModel on success', async () => {
    const { sut } = makeSut();
    const surveyResult = await sut.load('any_surveyId');
    expect(surveyResult).toEqual(mockSurveyResultModel());
  });
});
