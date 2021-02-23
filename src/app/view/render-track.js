import { sortByField } from '../../helpers';

export function renderTrackReport (report) {
  const message = `
    <body>
    <h1 style="margin-bottom: 0px">Ranking Report</h1>
    <p style="color: #AAAAAA; font-size: 8px; margin-top: 0px">Stake: ${report.stake.id}</p>
    ${report.terms.map(t => renderTerm(t)).join('')}
    </body>
  `;

  const withoutBlankLines = message.replace(/^\s*$(?:\r\n?|\n)/gm, '');
  const withoutLeadingSpaces = withoutBlankLines.replace(/^\s+|\s+$/gm, '');
  return withoutLeadingSpaces;
}

function renderTerm (term) {
  return `
    <h2>Term: ${term.term}</h2>
    ${renderTrend(term.trend)}
    ${term.rankings.map(r => renderRanking(r)).join('')}
  `;
}

function renderTrend (trend) {
  const sortedPosition = sortByField(trend, 'when', false);

  return `
    <h3 style="margin-bottom: 0px">Trend</h3>
    <p style="color: #696969; font-size: 14px; margin-top: 0px">List the first search result for this Term in the last few days</p>
    ${sortedPosition.map(p => renderTrendPosition(p)).join('')}
  `;
}

function renderTrendPosition (trendPosition) {
  const prettyWhen = prettifyWhen(trendPosition.when);
  return `
    <p style="margin:0px">${prettyWhen}: 
      <a href="${trendPosition.page}">${trendPosition.page.substr(0, 30)}${trendPosition.page.length > 15 ? '...' : ''}</a>
    </p>
  `;
};

function renderRanking (ranking) {
  const sortedPosition = sortByField(ranking.positions, 'when', false);

  return `
    <h3>Page: ${ranking.page}</h3>
    ${sortedPosition.map(p => renderRankingPosition(p)).join('')}
  `;
}

function renderRankingPosition (rankingPosition) {
  const prettyWhen = prettifyWhen(rankingPosition.when);
  const prettyPosition = rankingPosition.position === 0 ? 'Not found' : `${rankingPosition.position}º`;
  return `
    <p style="margin:0px">${prettyWhen}: ${prettyPosition}</p>
  `;
}

function prettifyWhen (w) {
  const y = w.getFullYear();
  const m = (w.getMonth() + 1).toString().padStart(2, '0');
  const d = (w.getDate() + 1).toString().padStart(2, '0');
  return `${y}-${m}-${d}`;
}
