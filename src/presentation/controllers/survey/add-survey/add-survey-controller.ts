import { badRequest } from "../../../helpers/http/http-helper";
import { Controller, HttpRequest, HttpResponse, Validation } from "./add-survey-controller-protocols";

export class AddSurveyController implements Controller {
    constructor(
        private readonly validation: Validation
    ){}
    handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const error = this.validation.validate(httpRequest.body)
        if(error){
            return new Promise(resolve => resolve(badRequest(error)))
        }
        return new Promise(resolve => resolve(null))
    }
}