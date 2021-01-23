export function initVanillaDb () {
  return {
    stakes: [],
    rankings: [],
    snapshots: [],

    saveStakes (newStakes) {
      return saveItems(this.stakes, newStakes);
    },

    queryStakes () {
      return Promise.resolve([...this.stakes]);
    },

    deleteStake (id) {
      const index = this.stakes.findIndex(stake => stake.id === id);
      this.stakes.splice(index, 1);
      return Promise.resolve(index !== -1);
    },

    saveRankings (newRankings) {
      return saveItems(this.rankings, newRankings);
    },

    queryRankings () {
      return Promise.resolve([...this.rankings]);
    },

    queryRankingsSince (start) {
      return Promise.resolve(this.rankings.filter(r => r.when >= start));
    },

    saveSnapshots (newSnapshots) {
      return saveItems(this.snapshots, newSnapshots);
    },

    querySnapshots () {
      return Promise.resolve([...this.snapshots]);
    },

    querySnapshotsSince (start) {
      return Promise.resolve(this.snapshots.filter(s => s.when >= start));
    }
  };
};

function saveItems (collection, items) {
  if (!Array.isArray(items) || items.length === 0) return true;
  collection.push(...items);
  return Promise.resolve(true);
}
