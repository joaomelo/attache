import { subscriptions } from './subscriptions';
import { rank } from './rank';

describe('rank', () => {
  test('return stake rankings', () => {
    const stake = subscriptions[0].stakes[0];
    const searcher = (term, size) => {
      const result = [];
      for (let i = 0; i < size; i++) {
        result.push('www.site.com');
      }

      if (term === 'service') {
        result[100] = 'company.com';
      }

      if (term === 'service my-city') {
        result[10] = 'company.com';
        result[50] = 'www.landing-page.com';
      }

      return result;
    };

    const rankings = rank({ stake }, { searcher });

    expect(rankings).toEqual({
      'company.com': {
        service: 100,
        'service my-city': 10
      },
      'www.landing-page.com': {
        service: -1,
        'service my-city': 50
      }
    });
  });
});
