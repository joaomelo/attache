export function filterTermsWithoutSnapshot (terms, snapshots) {
  const withoutSnapshot = term => !snapshots.find(s => s.term === term);
  return terms.filter(t => withoutSnapshot(t));
}
