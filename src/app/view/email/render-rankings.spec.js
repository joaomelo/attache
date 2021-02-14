import { fromToday } from '../../../helpers';
import { renderRanking } from './render-ranking';

describe('view email module', () => {
  const ranking = {
    stake: {
      id: '87178090-383e-4780-a363-a076a6f952dd',
      pages: ['cloud.google', 'firebase.google'],
      terms: ['cloud', 'serverless'],
      emails: ['some@email.com']
    },
    terms: [
      {
        term: 'cloud',
        pages: [
          {
            page: 'cloud.google',
            positions: [
              { when: fromToday(0), position: 1 },
              { when: fromToday(-5), position: 3 },
              { when: fromToday(-2), position: 0 },
              { when: fromToday(-3), position: 4 }
            ]
          },
          {
            page: 'firebase.google',
            positions: [
              { when: fromToday(-1), position: 0 },
              { when: fromToday(-2), position: 0 },
              { when: fromToday(-4), position: 0 },
              { when: fromToday(-3), position: 100 }
            ]
          }
        ]
      },
      {
        term: 'serverless',
        pages: [
          {
            page: 'cloud.google',
            positions: [
              { when: fromToday(0), position: 98 },
              { when: fromToday(-2), position: 50 },
              { when: fromToday(-5), position: 0 },
              { when: fromToday(-3), position: 100 }
            ]
          },
          {
            page: 'firebase.google',
            positions: [
              { when: fromToday(-7), position: 2 },
              { when: fromToday(-6), position: 5 },
              { when: fromToday(-5), position: 3 },
              { when: fromToday(-3), position: 0 }
            ]
          }
        ]
      }
    ]
  };

  test('render ranking', () => {
    const message = renderRanking(ranking);

    ranking.terms.forEach(t => {
      expect(message).toEqual(expect.stringContaining(t.term));
      t.pages.forEach(p => {
        expect(message).toEqual(expect.stringContaining(p.page));
      });
    });
  });
});
