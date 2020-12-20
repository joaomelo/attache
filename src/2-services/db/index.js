export function createDummyDb () {
  return {
    rankings: [],

    saveReport (report) {
      this.rankings.push(...report);
    },

    getRankingsSince (date) {
      return this.rankings.filter(ranking => ranking.when >= date);
    }
  };
};
