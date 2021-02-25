import { join } from 'path';
import { writeFile } from 'fs';
import { stakes, snapshots } from '../../../tests/fixtures';
import { mountTracks } from '../../domain/tracks';
import { renderTrackReport } from './render-track';

describe('view email module', () => {
  const track = mountTracks(stakes, snapshots)[0];

  test('render track', () => {
    const message = renderTrackReport(track);

    writeFile(join(__dirname, 'render-ranking.test.html'), message, err => { err && console.error(err); });

    track.terms.forEach(t => {
      expect(message).toEqual(expect.stringContaining(t.term));
      t.rankings.forEach(r => {
        expect(message).toEqual(expect.stringContaining(r.page));
      });
    });
  });
});
