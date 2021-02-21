import { serializePagePositions } from './positions';

export function rankPageInTerm (tuple, snapshots) {
  const term = tuple[0];
  const termSnapshots = snapshots.filter(s => s.success && s.term === term);

  const page = tuple[1];
  const positions = serializePagePositions(page, termSnapshots);

  const ranking = {
    term: tuple[0],
    page: tuple[1],
    positions
  };

  return ranking;
};
