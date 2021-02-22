import { stakes, snapshots } from '../../../tests/fixtures';
import { mountTracks } from './mount-tracks';

describe('mountTracks', () => {
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
