import { sortByField, joinMap } from '../../helpers';

export function renderTrackTextReport (track) {
  return `
===== TRACK REPORT =====

${joinMap(track.terms, renderTerm)}
********************
Made with ❤ by Attaché. A open source project available at https://github.com/joaomelo/attache.
Report for ${track.stake.id}
`;
}

function renderTerm (term) {
  return `
Searching for "${term.term.toUpperCase()}"
----------
${renderTrend(term.trend)}

${joinMap(term.rankings, renderRanking, '\n')}
`;
}

function renderTrend (trend) {
  const trendPositions = renderSeries(trend, p => p.page);
  return `FIRST search results were: \n${trendPositions}`;
}

function renderRanking (ranking) {
  const dataRender = p => `${p.position === 0 ? 'Not found' : `${p.position}º`}`;
  const rankingPositions = renderSeries(ranking.positions, dataRender);

  return `Page "${ranking.page.toUpperCase()}" ranked: \n${rankingPositions} \n`;
}

function renderSeries (series, dataRender) {
  const sortedPosition = sortByField(series, 'when', false);
  const renderPosition = p => `* ${prettifyWhen(p.when)}: ${dataRender(p)}`;
  const positions = joinMap(sortedPosition, renderPosition, '\n');
  return positions;
}

function prettifyWhen (w) {
  const y = w.getFullYear();
  const m = (w.getMonth() + 1).toString().padStart(2, '0');
  const d = (w.getDate() + 1).toString().padStart(2, '0');
  return `${y}-${m}-${d}`;
}
