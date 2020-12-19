import { v4 as idGenerator } from 'uuid';
import { Stake } from './stake';

describe('Stake', () => {
  test('generates id if none is provided', () => {
    const payload = { pages: [ "linkedin.com/in/joaomelo81/" ], terms: [ "joão melo" ] };

    const id = 'hello-from-id';
    const idGenerator = () => id;

    const stake = new Stake(payload, { idGenerator });

    expect(stake.id).toBe(id);
  })
})