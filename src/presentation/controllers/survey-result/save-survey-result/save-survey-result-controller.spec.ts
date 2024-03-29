import {
  HttpRequest,
  LoadSurveyById,
  SaveSurveyResult,
} from './save-survey-result-controller-protocols';
import { SaveSurveyResultController } from './save-survey-result-controller';
import MockDate from 'mockdate';
import {
  forbidden,
  serverError,
  ok,
} from '@/presentation/helpers/http/http-helper';
import { InvalidParamError } from '@/presentation/errors';
import { mockSurveyResultModel } from '@/domain/test';
import { mockLoadSurveyById } from '@/presentation/test';
import { mockSaveSurveyResult } from '@/presentation/test/mock-survey-result';

const mockRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_survey_id',
  },
  body: { answer: 'any_answer' },
  accountId: 'any_account_id',
});

type SutTypes = {
  sut: SaveSurveyResultController;
  loadSurveyByIdStub: LoadSurveyById;
  saveSurveyResultStub: SaveSurveyResult;
};

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = mockLoadSurveyById();
  const saveSurveyResultStub = mockSaveSurveyResult();
  const sut = new SaveSurveyResultController(
    loadSurveyByIdStub,
    saveSurveyResultStub
  );
  return { loadSurveyByIdStub, sut, saveSurveyResultStub };
};

describe('SaveSurveyResult Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });
  test('Should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById');
    await sut.handle(mockRequest());
    expect(loadByIdSpy).toBeCalledWith('any_survey_id');
  });

  test('Should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    jest
      .spyOn(loadSurveyByIdStub, 'loadById')
      .mockReturnValue(Promise.resolve(null));
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')));
  });

  test('Should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    jest
      .spyOn(loadSurveyByIdStub, 'loadById')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Should return 403 if an invalid answer is provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({
      params: {
        surveyId: 'any_survey_id',
      },
      body: { answer: 'wrong_answer' },
    });
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('answer')));
  });

  test('Should call SaveSurveyResult with correct values', async () => {
    const { sut, saveSurveyResultStub } = makeSut();
    const saveSpy = jest.spyOn(saveSurveyResultStub, 'save');
    await sut.handle(mockRequest());
    expect(saveSpy).toBeCalledWith({
      surveyId: 'any_survey_id',
      accountId: 'any_account_id',
      answer: 'any_answer',
      date: new Date(),
    });
  });

  test('Should return 500 if SaveSurveyResult throws', async () => {
    const { sut, saveSurveyResultStub } = makeSut();
    jest
      .spyOn(saveSurveyResultStub, 'save')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(ok(mockSurveyResultModel()));
  });
});
