export class Stake {
  constructor (payload, dependencies) {
    const { id, terms, sites } = payload;
    const { idGenerator } = dependencies;

    this.id  = id || idGenerator();

    this.terms = terms;
    this.sites = sites;
  }
}