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

    deleteStake (id) {
      const index = this.stakes.findIndex(stake => stake.id === id);
      this.stakes.splice(index, 1);
      return Promise.resolve(index !== -1);
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
