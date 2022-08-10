import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@/presentation/protocols';
import { LogControllerDecorator } from './log';
import { ok, serverError } from '@/presentation/helpers/http/http-helper';
import { LogErrorRepository } from '@/data/protocols/db/log/log-error-repository';
import { mockAccountModel } from '@/domain/test';
import { mockLogErrorRepository } from '@/data/test';

type SutTypes = {
  sut: LogControllerDecorator;
  controllerStub: Controller;
  logErrorRepositoryStub: LogErrorRepository;
};

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      return Promise.resolve(ok(mockAccountModel));
    }
  }
  return new ControllerStub();
};

const makeSut = (): SutTypes => {
  const controllerStub = makeController();
  const logErrorRepositoryStub = mockLogErrorRepository();
  const sut = new LogControllerDecorator(
    controllerStub,
    logErrorRepositoryStub
  );
  return {
    sut,
    controllerStub,
    logErrorRepositoryStub,
  };
};

const mockRequest = (): HttpRequest => ({
  body: {
    name: 'any name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password',
  },
});

const mockServerError = (): HttpResponse => {
  const fakeError = new Error();
  fakeError.stack = 'any_stack';
  return serverError(fakeError);
};

describe('LogController Decorator', () => {
  test('Should call controller handler', async () => {
    const { sut, controllerStub } = makeSut();
    const handlesSpy = jest.spyOn(controllerStub, 'handle');
    await sut.handle(mockRequest());
    expect(handlesSpy).toBeCalledWith(mockRequest());
  });

  test('Should return the same result of the Controler', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(ok(mockAccountModel));
  });

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut();
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError');
    jest
      .spyOn(controllerStub, 'handle')
      .mockReturnValueOnce(Promise.resolve(mockServerError()));
    await sut.handle(mockRequest());
    expect(logSpy).toHaveBeenCalledWith('any_stack');
  });
});
