export function createStakesCollection (db) {
  const collectionName = 'stakes';
  return {
    save: newStakes => db.saveItems(collectionName, newStakes),
    queryAll: () => db.queryAllItems(collectionName),
    async queryTerms () {
      const allStakes = await this.queryAll();
      const termsSet = new Set(allStakes.flatMap(s => s.terms));
      return Array.from(termsSet.values());
    }
  };
}
