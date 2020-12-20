export function initMemoryDb () {
  return {
    rankings: [],

    saveReport (report) {
      this.rankings.push(...report);
      return Promise.resolve(true);
    },

    getRankingsSince (date) {
      const rankingsSince = this.rankings.filter(ranking => ranking.when >= date);
      return Promise.resolve(rankingsSince);
    }
  };
};
