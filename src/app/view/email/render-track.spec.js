import { trackReports } from '../../../../tests/fixtures';
import { renderTrackReport } from './render-track';
import { writeFile } from 'fs';

describe('view email module', () => {
  const report = trackReports[0];

  test('render ranking', () => {
    const message = renderTrackReport(report);

    writeFile('render-ranking.test.html', message, err => { err && console.error(err); });

    report.terms.forEach(t => {
      expect(message).toEqual(expect.stringContaining(t.term));
      t.rankings.forEach(r => {
        expect(message).toEqual(expect.stringContaining(r.page));
      });
    });
  });
});
