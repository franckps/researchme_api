import {
  RequiredFieldValidation,
  ValidationComposite,
  EmailValidation,
} from '@/validation/validators';
import { Validation } from '@/presentation/protocols';
import { makeLoginValidation } from './login-validation-factory';
import { EmailValidator } from '@/validation/protocols/email-validator';

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

jest.mock('../../../../../validation/validators/validation-composite');

describe('LoginValidation Factory', () => {
  test('Should call Validation Composite with all validations', () => {
    makeLoginValidation();
    const validations: Validation[] = [];
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(new EmailValidation('email', makeEmailValidator()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
