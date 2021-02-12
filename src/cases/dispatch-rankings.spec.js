import { calcSomedayFromToday } from '../helpers';
import { initDb } from '../app/db';
import { dispatchFreshRankingsForStakes } from './dispatch-rankings';

describe('dispatchFreshRankingsForStakes', () => {
  const stakes = [
    {
      id: '9164167b-6588-4dc1-a710-19a43a836df5',
      pages: ['cloud.google', 'firebase.google'],
      terms: ['cloud', 'serverless'],
      emails: ['some@email.com']
    },
    {
      id: 'efcd94d9-cfe9-47bd-b128-57c03ca12a96',
      pages: ['aws.amazon.com'],
      terms: ['cloud'],
      emails: ['other@email.com']
    }
  ];
  const snapshots = [
    {
      when: new Date(),
      success: true,
      term: 'serverless',
      result: ['azure.microsoft.com', 'aws.amazon.com', 'firebase.google.com']
    },
    {
      when: calcSomedayFromToday(-2),
      success: true,
      term: 'serverless',
      result: ['azure.microsoft.com', 'firebase.google.com', 'aws.amazon.com']
    },
    {
      when: calcSomedayFromToday(-2),
      term: 'cloud',
      success: false
    },
    {
      when: calcSomedayFromToday(-1),
      success: true,
      term: 'cloud',
      result: ['azure.microsoft.com', 'aws.amazon.com', 'cloud.google.com', 'firebase.google.com']
    }
  ];

  let db, dispatcher, logger;
  beforeEach(async () => {
    db = initDb('vanilla');
    await db.saveStakes(stakes);
    await db.saveSnapshots(snapshots);

    dispatcher = { send: jest.fn() };
    logger = { info: jest.fn() };
  });

  describe('happy path', () => {
    test('dispatch a ranking for every stake', async () => {
      const dispatchedRankings = await dispatchFreshRankingsForStakes({ db, logger, dispatcher });

      expect(dispatchedRankings).toBe(stakes.length);
      expect(dispatcher.send).toHaveBeenCalledTimes(stakes.length);

      const lastCall = logger.info.mock.calls.length - 1;
      const lastLogCallParam = logger.info.mock.calls[lastCall][0];
      expect(lastLogCallParam).toEqual(expect.stringContaining(stakes.length.toString()));
    });
  });

  describe('absent data scenarios', () => {
    test('do not dispatch rankings without stakes', async () => {
      db = initDb('vanilla');
      await db.saveStakes([]);
      await db.saveSnapshots(snapshots);

      const dispatchedRankings = await dispatchFreshRankingsForStakes({ db, logger, dispatcher });
      expect(dispatchedRankings).toBe(0);

      const logCallParam = logger.info.mock.calls[0][0];
      expect(logCallParam).toEqual(expect.stringContaining('no stakes'));
    });

    test('do not dispatch rankings without snapshots', async () => {
      db = initDb('vanilla');
      await db.saveStakes(stakes);
      await db.saveSnapshots([]);

      const dispatchedRankings = await dispatchFreshRankingsForStakes({ db, logger, dispatcher });
      expect(dispatchedRankings).toBe(0);

      const logCallParam = logger.info.mock.calls[0][0];
      expect(logCallParam).toEqual(expect.stringContaining('no snapshots'));
    });
  });
});
