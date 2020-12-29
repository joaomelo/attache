import { calcToday } from '../../helpers';
import { rankStakes } from './stakes';

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

  test('return correct rankings quantity', () => {
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

  test('will not rank against failed term searches', () => {
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

  test('will reuse cached rankings', () => {
    const today = calcToday();
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
    const cache = [{
      id: 'da1f6393-5226-4e7d-9569-c0b4e0a37b2f',
      page: 'company.com',
      term: 'service',
      position: 1,
      size: 2,
      when: today
    }];

    const rankings = rankStakes({ stakes, cache, snapshots });
    const ranking = rankings.find(r => r.page === 'company.com' && r.term === 'service');

    expect(ranking.id).toEqual(cache[0].id);
  });
});
