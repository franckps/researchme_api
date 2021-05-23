import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

interface SutTypes {
    sut: LogControllerDecorator,
    controllerStub: Controller
}

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        statusCode: 200,
        body: {
          name: 'Francisco'
        }
      }
      return new Promise(resolve => resolve(httpResponse))
    }
  }
  return new ControllerStub()
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const sut = new LogControllerDecorator(controllerStub)
  return {
    sut,
    controllerStub
  }
}

describe('LogController Decorator', () => {
  test('Should call controller handler', async () => {
    const { sut, controllerStub } = makeSut()
    const handlesSpy = jest.spyOn(controllerStub, 'handle')
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        name: 'any name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(handlesSpy).toBeCalledWith(httpRequest)
  })
})
