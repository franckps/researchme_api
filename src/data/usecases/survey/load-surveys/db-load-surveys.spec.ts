import { LoadSurveysRepository } from './db-load-surveys-protocols';
import { DbLoadSurveys } from './db-load-surveys';
import MockDate from 'mockdate';
import { mockLoadSurveysRepository } from '@/data/test';
import { mockSurveyModels } from '@/data/test/mock-survey';

type SutTypes = {
  sut: DbLoadSurveys;
  loadSurveysRepositoryStub: LoadSurveysRepository;
};

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = mockLoadSurveysRepository();
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub);
  return { sut, loadSurveysRepositoryStub };
};

describe('DbLoadSurveys ', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });
  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut();
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll');
    await sut.load();
    expect(loadAllSpy).toHaveBeenCalled();
  });

  test('Should return a list of surveys on success', async () => {
    const { sut } = makeSut();
    const surveys = await sut.load();
    expect(surveys).toEqual(mockSurveyModels());
  });

  test('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut();
    jest
      .spyOn(loadSurveysRepositoryStub, 'loadAll')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const promise = sut.load();
    await expect(promise).rejects.toThrow();
  });
});
