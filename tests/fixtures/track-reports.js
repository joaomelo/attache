import { fromToday } from '../../src/helpers';

export const trackReports = [
  {
    stake: {
      id: '87178090-383e-4780-a363-a076a6f952dd',
      pages: ['cloud.google', 'firebase.google'],
      terms: ['cloud', 'serverless'],
      emails: ['some@email.com']
    },
    terms: [
      {
        term: 'cloud',
        trend: [
          { when: fromToday(0), page: 'cloud.google' },
          { when: fromToday(-5), page: 'another-page.com' },
          { when: fromToday(-2), page: 'another-page.com' },
          { when: fromToday(-3), page: 'another-page.com' }
        ],
        rankings: [
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
        trend: [
          { when: fromToday(0), page: 'another-page.com' },
          { when: fromToday(-5), page: 'another-page.com' },
          { when: fromToday(-2), page: 'another-page.com' },
          { when: fromToday(-3), page: 'another-page.com' }
        ],
        rankings: [
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
  }
];
