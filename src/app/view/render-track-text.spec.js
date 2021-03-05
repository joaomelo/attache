import { join } from 'path';
import { writeFile } from 'fs';
import { stakes, snapshots } from '../../../tests/fixtures';
import { mountTracks } from '../../domain/tracks';
import { renderTrackTextReport } from './render-track-text';

describe('render text track report', () => {
  const track = mountTracks(stakes, snapshots)[0];

  test('render track', () => {
    const message = renderTrackTextReport(track).toLowerCase();

    writeFile(join(__dirname, 'render-ranking.test.txt'), message, err => { err && console.error(err); });

    track.terms.forEach(t => {
      expect(message).toEqual(expect.stringContaining(t.term));
      t.rankings.forEach(r => {
        expect(message).toEqual(expect.stringContaining(r.page));
      });
    });
  });
});
