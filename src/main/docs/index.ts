import paths from './paths';
import components from './components';
import schemas from './schemas';

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
  tags: [{ name: 'Login' }, { name: 'Survey' }],
  paths,
  schemas,
  components,
};
