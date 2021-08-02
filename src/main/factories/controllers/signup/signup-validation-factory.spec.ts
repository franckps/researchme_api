import { RequiredFieldValidation } from '../../../../validation/validators/required-field-validation'
import { CompareFieldsValidation } from '../../../../validation/validators/compare-fields-validation'
import { Validation } from '../../../../presentation/protocols/validation'
import { ValidationComposite } from '../../../../validation/validators/validation-composite'
import { makeSignUpValidation } from './signup-validation-factory'
import { EmailValidation } from '../../../../validation/validators/email-validation'
import { EmailValidator } from '../../../../validation/protocols/email-validator'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

jest.mock('../../../../validation/validators/validation-composite')

describe('SignUpValidation Factory', () => {
  test('Should call Validation Composite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
