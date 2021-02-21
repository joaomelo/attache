import { stakes, snapshots } from '../../../tests/fixtures';
import { tupleTermsAndPages } from '../stakes';
import { rankPagesInTerms } from '../rankings';
import { extractTrends } from '../trends';
import { mountReports } from './mount-reports';

describe('mount track reports', () => {
  test('correct mount reports', () => {
    const tuples = tupleTermsAndPages(stakes);
    const rankings = rankPagesInTerms(tuples, snapshots);
    const trends = extractTrends(snapshots);

    const reports = mountReports(stakes, rankings, trends);

    expect(reports).toHaveLength(stakes.length);
    expect(reports).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          stake: expect.any(Object),
          terms: expect.arrayContaining([
            expect.objectContaining({
              term: expect.any(String),
              trend: expect.arrayContaining([
                expect.objectContaining({
                  when: expect.any(Date),
                  page: expect.any(String)
                })
              ]),
              rankings: expect.arrayContaining([
                expect.objectContaining({
                  page: expect.any(String),
                  positions: expect.any(Array)
                })
              ])
            })
          ])
        })
      ])
    );
  });
});
