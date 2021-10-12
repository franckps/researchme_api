import { AccountModel } from "../../domain/models/account"
import { LoadAccountByToken } from "../../domain/usecases/load-account-by-token"
import { AccessDeniedError } from "../errors"
import { forbidden } from "../helpers/http/http-helper"
import { AuthMiddleware } from "./auth-middleware"

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid name',
  email: 'valid_email@email.com',
  password: 'hashed_password'
})

describe('Auth Middleware', () => {
    test('Should return 403 if no nox-access-token exists in headers', async () => {
        class LoadAccountByTokenStub implements LoadAccountByToken {
            load(accessToken: string, role?: string): Promise<AccountModel> {
                return new Promise(resolve => resolve(makeFakeAccount()))
            }
        }
        const sut = new AuthMiddleware(new LoadAccountByTokenStub())
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
    })
    
    test('Should call load account by a token with correct accessToken', async () => {
        class LoadAccountByTokenStub implements LoadAccountByToken {
            load(accessToken: string, role?: string): Promise<AccountModel> {
                return new Promise(resolve => resolve(makeFakeAccount()))
            }
        }
        const loadAccountByTokenStub = new LoadAccountByTokenStub()
        const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
        const sut = new AuthMiddleware(loadAccountByTokenStub)
        const httpResponse = await sut.handle({
            headers: {
                'x-access-token': 'any_token'
            }
        })
        expect(loadSpy).toHaveBeenCalledWith('any_token')
    })
})