import { initDb } from '../../app/db';
import { createLogger } from './index';

describe('log module', () => {
  const loggerTypeTestTable = [
    ['db', () => {
      const db = initDb('vanilla');
      return createLogger('db', { db });
    }]
  ];
  const logLevelTestTable = ['info', 'error'];

  describe.each(loggerTypeTestTable)('happy path for %p logger type', (type, create) => {
    test.each(logLevelTestTable)('saves %p level logs', async level => {
      const logger = create();

      const msg = 'some log message';
      await logger[level](msg);

      const logs = await logger.queryAll();
      expect(logs).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            msg,
            when: expect.any(Date),
            type: level
          })
        ])
      );
    });
  });
});
