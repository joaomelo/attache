export function extractTrends (snapshots) {
  const trends = snapshots
    .filter(s => s.success)
    .reduce((t, s) => {
      if (!t[s.term]) t[s.term] = [];

      t[s.term].push({
        when: s.when,
        page: s.result[0]
      });

      return t;
    }, {});

  return trends;
}
