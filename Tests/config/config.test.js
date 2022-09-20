import config from '../../src/config/config.cjs';

const title = 'Environmental Variables are properly imported by the config file.'

test(title, () => {
  expect(config.APP_NAME).toBe("Docshare");
});