import { rankPageInTerm } from './rank-tuple';

export function rankPagesInTerms (tuples = [], snapshots = []) {
  return tuples.map(tuple => rankPageInTerm(tuple, snapshots));
}
