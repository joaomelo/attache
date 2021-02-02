import { sortByField } from '../../helpers';
import { filterRankings } from './filter';

export function calcPageRankingEvolutionMetrics ({ rankings, page, term, start, end }) {
  const filteredRankings = filterRankings({ rankings, page, term, start, end });

  const unorderedData = filteredRankings.map(r => ({ when: r.when, position: r.position }));
  const data = sortByField(unorderedData, 'when', true);

  const metrics = {
    page,
    term,
    start,
    end,
    data
  };
  return metrics;
}
