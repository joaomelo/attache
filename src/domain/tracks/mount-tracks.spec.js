import { stakes, snapshots } from '../../../tests/fixtures';
import { mountTracks } from './mount-tracks';

describe('mountTracks', () => {
  describe('happy paths', () => {
    test('correct mount tracks', () => {
      const tracks = mountTracks(stakes, snapshots);

      expect(tracks).toHaveLength(stakes.length);
      expect(tracks).toEqual(
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

  describe('alternative scenarios', () => {
    test('do not mount tracks if no stakes available', () => {
      const tracks = mountTracks([], snapshots);
      expect(tracks).toHaveLength(0);
    });

    test('do not mount tracks for stakes without snapshots', () => {
      const tracks = mountTracks(stakes, []);
      expect(tracks).toHaveLength(0);
    });

    test('do not mount tracks partials for terms without snapshots', () => {
      const partialSnapshots = snapshots.filter(s => s.term === 'serverless');
      const tracks = mountTracks(stakes, partialSnapshots);
      expect(tracks[0].terms).toHaveLength(1);
    });
  });
});
