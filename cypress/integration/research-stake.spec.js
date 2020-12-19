import { Stake } from '../../src/1-domain/entities/stake';

describe('research-stake', () => {

  it('call  search at every stake term', async () => {
    const stakes = cy.fixtures('stakes');
    expect(stakes).to.have.lengthOf(2);
  });

});