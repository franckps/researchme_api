import { badRequest, serverError, unauthorized, notFound } from './components';
import { loginPath } from './paths';
import { accountSchema, errorSchema, loginParamsSchema } from './schemas';

export default {
  openapi: '3.0.0',
  info: {
    title: 'research_me',
    description: "An simple survey's api",
    version: '1.0.0',
  },
  license: {
    name: 'MIT',
    url: 'https://opensource.org/licenses/MIT',
  },
  servers: [
    {
      url: '/api',
    },
  ],
  tags: [{ name: 'Login' }],
  paths: {
    '/login': loginPath,
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema,
  },
  components: {
    badRequest,
    serverError,
    unauthorized,
    notFound,
  },
};
