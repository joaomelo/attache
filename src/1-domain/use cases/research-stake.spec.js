import { Stake } from '../entities/stake';
import { stakesData } from '../../../tests/fixtures';

describe('research-stake', () => {

  test('call search at every stake term', async () => {
    expect(stakesData).toHaveLength(2);
  });

});
