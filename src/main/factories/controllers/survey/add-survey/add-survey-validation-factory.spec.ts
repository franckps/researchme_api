import {
  RequiredFieldValidation,
  ValidationComposite,
} from '@/validation/validators';
import { Validation } from '@/presentation/protocols';
import { makeAddSurveyValidation } from './add-survey-validation-factory';

jest.mock('../../../../../validation/validators/validation-composite');

describe('AddSurveyValidation Factory', () => {
  test('Should call Validation Composite with all validations', () => {
    makeAddSurveyValidation();
    const validations: Validation[] = [];
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldValidation(field));
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
