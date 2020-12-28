export function initMemoryDb () {
  return {
    stakes: [],
    rankings: [],
    snapshots: [],

    queryStakes () {
      return Promise.resolve([...this.stakes]);
    },

    saveStakes (stakes) {
      this.stakes.push(...stakes);
      return Promise.resolve(true);
    },

    queryRankings () {
      return Promise.resolve([...this.rankings]);
    },

    saveRankings (rankings) {
      this.rankings.push(...rankings);
      return Promise.resolve(true);
    },

    querySnapshots () {
      return Promise.resolve([...this.snapshots]);
    },

    saveSnapshots (snapshots) {
      this.snapshots.push(...snapshots);
      return Promise.resolve(true);
    }
  };
};
