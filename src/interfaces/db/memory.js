export function initMemoryDb () {
  return {
    searches: [],
    stakes: [],
    rankings: [],

    saveReport (report) {
      this.rankings.push(...report);
      return Promise.resolve(true);
    },

    saveSearches (searches) {
      this.searches.push(...searches);
      return Promise.resolve(true);
    },

    getRankingsSince (date) {
      const rankingsSince = this.rankings.filter(ranking => ranking.when >= date);
      return Promise.resolve(rankingsSince);
    },

    getAllStakes () {
      return Promise.resolve([...this.stakes]);
    }
  };
};
