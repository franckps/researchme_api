import { EmailValidation } from './email-validation';
import { EmailValidator } from '../protocols/email-validator';
import { InvalidParamError } from '@/presentation/errors';
import { mockEmailValidator } from '../test';

type SutTypes = {
  sut: EmailValidation;
  emailValidatorStub: EmailValidator;
};

const makeSut = (): SutTypes => {
  const emailValidatorStub = mockEmailValidator();
  const sut = new EmailValidation('email', emailValidatorStub);

  return {
    sut,
    emailValidatorStub,
  };
};

describe('Email Validation', () => {
  test('Should return an error if Email Validator returns false', () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
    const error = sut.validate({ email: 'any_email@mail.com' });
    expect(error).toEqual(new InvalidParamError('email'));
  });

  test('Should call EmailValidator with the correct email', () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');
    sut.validate({ email: 'any_email@mail.com' });
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com');
  });

  test('Should throws if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });
    expect(sut.validate).toThrow();
  });
});
