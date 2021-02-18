import { snapshots } from '../../../tests/fixtures';
import { serializePagePositions } from './page';

describe('serializePagePositions', () => {
  const page = 'azure.microsoft.com';

  test('correctly serialize page positions', () => {
    const pagePositions = serializePagePositions(page, snapshots);

    expect(pagePositions).toEqual(
      expect.objectContaining({
        page,
        positions: expect.arrayContaining([
          expect.objectContaining({
            when: expect.any(Date),
            position: expect.any(Number)
          })
        ])
      })
    );

    expect(pagePositions.positions).toHaveLength(4);
  });
});
