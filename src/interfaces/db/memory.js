export function initMemoryDb () {
  return {
    stakes: [],
    rankings: [],

    queryStakes () {
      return Promise.resolve([...this.stakes]);
    },

    saveStakes (stakes) {
      this.stakes.push(...stakes);
      return Promise.resolve(stakes);
    },

    queryRankings () {
      return Promise.resolve([...this.rankings]);
    },

    saveRankings (rankings) {
      this.rankings.push(...rankings);
      return Promise.resolve(rankings);
    }
  };
};
