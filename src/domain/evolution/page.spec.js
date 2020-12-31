import { calcToday, calcSomedayFromToday } from '../../helpers';
import { calcPageRankingEvolutionMetrics } from './page';

describe('Page Ranking Evolution Metrics', () => {
  const day0 = calcToday();
  const day1 = calcSomedayFromToday(1);
  const day2 = calcSomedayFromToday(2);
  const day10 = calcSomedayFromToday(10);

  const rankings = [
    { page: 'vuejs.org', term: 'js front end library', position: 2, when: day10 },
    { page: 'reactjs.org', term: 'js front end library', position: -1, when: day10 },
    { page: 'vuejs.org', term: 'js front end library', position: 1, when: day2 },
    { page: 'reactjs.org', term: 'js front end library', position: 21, when: day2 },
    { page: 'vuejs.org', term: 'best front end framework', position: 1, when: day2 },
    { page: 'reactjs.org', term: 'best front end framework', position: 21, when: day2 },
    { page: 'firebase.google.com', term: 'cloud', position: -1, size: 100, when: day1 },
    { page: 'azure.microsoft.com', term: 'cloud', position: 10, size: 100, when: day1 },
    { page: 'aws.amazon.com', term: 'cloud', position: 7, size: 100, when: day1 },
    { page: 'vuejs.org', term: 'js front end library', position: 10, when: day1 },
    { page: 'reactjs.org', term: 'js front end library', position: 20, when: day1 }
  ];

  test('return correct metrics shape', () => {
    const page = 'reactjs.org';
    const term = 'js front end library';
    const start = day0;
    const end = day2;

    const metrics = calcPageRankingEvolutionMetrics({ rankings, page, term, start, end });

    expect(metrics).toEqual(
      expect.objectContaining({
        page,
        term,
        start,
        end,
        data: expect.any(Array)
      })
    );

    expect(metrics.data).toHaveLength(2);

    expect(metrics.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          when: expect.any(Date),
          position: expect.any(Number)
        })
      ])
    );
  });

  test('data property must be correctly sorted', () => {
    const page = 'vuejs.org';
    const term = 'js front end library';
    const start = day0;
    const end = day10;

    const metrics = calcPageRankingEvolutionMetrics({ rankings, page, term, start, end });
    const { data } = metrics;

    expect(data[0].when).toEqual(day1);
    expect(data[1].when).toEqual(day2);
    expect(data[2].when).toEqual(day10);
  });

  test('if the period has no rankings return an empty array in data property', () => {
    const page = 'some-lame-library.com';
    const term = 'js front end library';
    const start = day0;
    const end = day10;

    const metrics = calcPageRankingEvolutionMetrics({ rankings, page, term, start, end });

    expect(metrics).toEqual({
      page,
      term,
      start,
      end,
      data: []
    });
  });
});
