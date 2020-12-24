export function initMemoryDb () {
  return {
    stakes: [],
    rankings: {},

    queryStakes () {
      return Promise.resolve([...this.stakes]);
    },

    saveStakes (stakes) {
      this.stakes.push(...stakes);
      return Promise.resolve(true);
    },

    // queryRankingsSince (date) {
    //   const rankingsSince = this.rankings.filter(ranking => ranking.when >= date);
    //   return Promise.resolve(rankingsSince);
    // },

    saveRankings (rankings) {
      rankings.forEach((value, key) => {
        this.rankings[key] = value;
      });
      return Promise.resolve(true);
    }
  };
};
