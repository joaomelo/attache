import { calcSomedayFromToday } from '../../helpers';
import { serializePagePositions } from './page';

describe('serializePagePositions', () => {
  const page = 'www.another.com';
  const snapshots = [
    {
      when: new Date(),
      success: true,
      result: ['www.some.com', 'www.another.com']
    },
    {
      when: calcSomedayFromToday(-2),
      success: false
    },
    {
      when: calcSomedayFromToday(-1),
      success: true,
      result: ['www.some.com', 'www.another.com/landing-page', 'www.another.com']
    }
  ];

  test('correctly calculate page positions', () => {
    const pagePositions = serializePagePositions(page, snapshots);

    expect(pagePositions).toEqual(
      expect.objectContaining({
        page,
        positions: expect.arrayContaining([
          expect.objectContaining({
            when: expect.any(Date),
            position: 2
          })
        ])
      })
    );

    expect(pagePositions.positions).toHaveLength(2);
  });
});
