import { calcToday, calcSomedayFromToday } from '../../helpers';
import { filterRankings } from './filter';

describe('filterRankings', () => {
  const day0 = calcToday();
  const day1 = calcSomedayFromToday(1);
  const day2 = calcSomedayFromToday(2);
  const day10 = calcSomedayFromToday(10);

  const rankings = [
    { page: 'vuejs.org', term: 'js front end library', position: 10, when: day1 },
    { page: 'reactjs.org', term: 'js front end library', position: 20, when: day1 },
    { page: 'vuejs.org', term: 'js front end library', position: 1, when: day2 },
    { page: 'reactjs.org', term: 'js front end library', position: 21, when: day2 },
    { page: 'vuejs.org', term: 'best front end framework', position: 1, when: day2 },
    { page: 'reactjs.org', term: 'best front end framework', position: 21, when: day2 },
    { page: 'vuejs.org', term: 'js front end library', position: 2, when: day10 },
    { page: 'reactjs.org', term: 'js front end library', position: -1, when: day10 },
    { page: 'firebase.google.com', term: 'cloud', position: -1, size: 100, when: day1 },
    { page: 'azure.microsoft.com', term: 'cloud', position: 10, size: 100, when: day1 },
    { page: 'aws.amazon.com', term: 'cloud', position: 7, size: 100, when: day1 }
  ];

  test('filter the correct rankings given page, term and period', () => {
    const page = 'vuejs.org';
    const term = 'js front end library';
    const start = day0;
    const end = day2;

    const filteredRankings = filterRankings({ rankings, page, term, start, end });

    expect(filteredRankings).toHaveLength(2);
  });
});
