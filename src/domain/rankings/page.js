export function serializePagePositions (page, snapshots) {
  const positions = snapshots
    .filter(s => s.success)
    .map(s => {
      const { result, when } = s;
      const position = result.findIndex(r => r.includes(page)) + 1;
      return {
        when,
        position
      };
    });

  return {
    page,
    positions
  };
}
