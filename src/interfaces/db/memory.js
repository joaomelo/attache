export function initMemoryDb () {
  return {
    stakes: [],
    rankings: [],
    snapshots: [],

    saveStakes (stakes) {
      this.stakes.push(...stakes);
      return Promise.resolve(true);
    },

    queryStakes () {
      return Promise.resolve([...this.stakes]);
    },

    saveRankings (rankings) {
      this.rankings.push(...rankings);
      return Promise.resolve(true);
    },

    queryRankings () {
      return Promise.resolve([...this.rankings]);
    },

    queryRankingsSince (start) {
      return Promise.resolve(this.rankings.filter(r => r.when >= start));
    },

    saveSnapshots (snapshots) {
      this.snapshots.push(...snapshots);
      return Promise.resolve(true);
    },

    querySnapshots () {
      return Promise.resolve([...this.snapshots]);
    },

    querySnapshotsSince (start) {
      return Promise.resolve(this.snapshots.filter(s => s.when >= start));
    }
  };
};
