import { AccountModel } from '@/domain/models/account';
import { AddAccountParams } from '@/domain/usecases/account/add-account';
import { AuthenticationParams } from '../usecases/account/authentication';

export const mockAccountData = (): AddAccountParams => ({
  name: 'any name',
  email: 'any_email@email.com',
  password: 'any_password',
});

export const mockAccountModel = (): AccountModel =>
  Object.assign({}, mockAccountData(), {
    id: 'any_id',
  });

export const mockFakeAuthentication = (): AuthenticationParams => ({
  email: 'any_email@mail.com',
  password: 'any_password',
});
