import { calcSomedayFromToday } from '../../src/helpers';

export const snapshots = [
  {
    term: 'cloud',
    when: new Date(),
    success: false,
    size: 2
  },
  {
    term: 'cloud',
    when: calcSomedayFromToday(-1),
    success: true,
    size: 2,
    result: ['www.some-page.com', 'www.another-page.net']
  }
];
