import { rankStakes } from './rank-stakes';

describe('rankStakes', () => {
  const stakes = [
    {
      pages: ['company.com', 'www.competitor.com'],
      terms: ['service']
    },
    {
      pages: ['www.competitor.com'],
      terms: ['service', 'service city']
    }
  ];

  test('return correct rankings quantity', async () => {
    const snapshots = [
      {
        term: 'service',
        when: new Date(),
        success: true,
        size: 2,
        result: ['www.company.com', 'www.someone.net']
      },
      {
        term: 'service city',
        when: new Date(),
        success: true,
        size: 3,
        result: ['www.company.com', 'www.someone.net', 'www.competitor.com']
      }
    ];

    const rankings = rankStakes({ stakes, snapshots });

    expect(rankings).toHaveLength(3);
  });

  test('will not rank against failed term searches', async () => {
    const snapshots = [
      {
        term: 'service',
        when: new Date(),
        success: true,
        size: 2,
        result: ['www.company.com', 'www.someone.net']
      },
      {
        term: 'service city',
        when: new Date(),
        success: false,
        error: 'quota exceeded',
        size: 3
      }
    ];

    const rankings = rankStakes({ stakes, snapshots });

    expect(rankings).toHaveLength(2);
  });
});
