export class Stake {
  constructor (payload, dependencies) {
    const { terms, sites } = payload;
    this.terms = terms;
    this.sites = sites;
  }
}