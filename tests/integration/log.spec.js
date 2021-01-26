import { createLogger } from '../../src/app/log';
import { createListOfDbInits } from '../helpers';

describe('log module', () => {
  const logTypeTestTable = ['info', 'error'];
  const dbTestTable = createListOfDbInits();

  describe.each(logTypeTestTable)('%p logs are saved correctly', logType => {
    test.each(dbTestTable)('using %p db', async (type, initFn) => {
      const db = await initFn();
      const logger = createLogger(db);
      const msg = 'this just happened';

      await logger[logType](msg);

      const logs = await db.queryLogs();
      expect(logs[0]).toEqual(
        expect.objectContaining({
          msg,
          when: expect.any(Date),
          type: logType
        })
      );
    });
  });
});
