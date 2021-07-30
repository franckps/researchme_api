import { LogMongoRepository } from "../../../../infra/db/mongodb/log/log-mongo-repository";
import { LoginController } from "../../../../presentation/controllers/login/login-controller";
import { Controller } from "../../../../presentation/protocols";
import { LogControllerDecorator } from "../../../decorators/log";
import { makeLoginValidation } from "./login-validation-factory";
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory';
import { makeLogControllerDecorator } from "../../decorators/log-controller-decorator-factory";

export const makeLoginController = (): Controller => {
    return makeLogControllerDecorator( new LoginController(makeDbAuthentication(), makeLoginValidation()) )
}
