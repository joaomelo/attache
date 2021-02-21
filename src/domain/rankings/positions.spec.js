import { snapshots } from '../../../tests/fixtures';
import { serializePagePositions } from './positions';

describe('serializePagePositions', () => {
  test('correctly serialize page positions', () => {
    const page = 'azure.microsoft.com';

    const pagePositions = serializePagePositions(page, snapshots);

    expect(pagePositions).toHaveLength(4);
    expect(pagePositions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          when: expect.any(Date),
          position: expect.any(Number)
        })
      ])
    );
  });
});
