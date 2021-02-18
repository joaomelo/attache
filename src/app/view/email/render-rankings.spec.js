import { rankings } from '../../../../tests/fixtures';
import { renderRanking } from './render-ranking';
import { writeFile } from 'fs';

describe('view email module', () => {
  const ranking = rankings[0];

  test('render ranking', () => {
    const message = renderRanking(ranking);
    writeFile('render-ranking.test.html', message, err => { err && console.error(err); });
    ranking.terms.forEach(t => {
      expect(message).toEqual(expect.stringContaining(t.term));
      t.pages.forEach(p => {
        expect(message).toEqual(expect.stringContaining(p.page));
      });
    });
  });
});
