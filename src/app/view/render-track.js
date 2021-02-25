import { sortByField } from '../../helpers';
import { resetCss, typography, colors } from './styles';

export function renderTrackReport (track) {
  const message = `
    <html>
      <head>
        ${resetCss}
        ${typography}
        ${colors}
      </head>
      <body>
        <h1 class="heavy dark fs4">
        Track Report
        </h1>
        ${track.terms.map(t => renderTerm(t)).join('')}
        ${renderFooter(track.stake.id)}
      </body>
    </html>
  `;

  const withoutBlankLines = message.replace(/^\s*$(?:\r\n?|\n)/gm, '');
  const withoutLeadingSpaces = withoutBlankLines.replace(/^\s+|\s+$/gm, '');
  return withoutLeadingSpaces;
}

function renderTerm (term) {
  return `
      <h2 class="fs3">
        <span class="normal grey">When searching for</span> <span class="heavy dark">${term.term}<span>
      </h2>
      ${renderTrend(term.trend)}
      ${term.rankings.map(r => renderRanking(r)).join('')}
  `;
}

function renderTrend (trend) {
  const sortedPosition = sortByField(trend, 'when', false);

  return `
    <h3 class="normal dark fs3">Trend</h3>
    <p class="normal greyish fs2">
      List the first search result for this Term in the last few days
    </p>
    ${sortedPosition.map(p => renderTrendPosition(p)).join('')}
  `;
}

function renderTrendPosition (trendPosition) {
  const prettyWhen = prettifyWhen(trendPosition.when);
  return `
    <p class="normal dark fs2">${prettyWhen}: 
      <a href="${trendPosition.page}">${trendPosition.page.substr(0, 30)}${trendPosition.page.length > 15 ? '...' : ''}</a>
    </p>
  `;
};

function renderRanking (ranking) {
  const sortedPosition = sortByField(ranking.positions, 'when', false);
  return `
    <h3 class="normal dark fs3">
      Page: ${ranking.page}
    </h3>
    ${sortedPosition.map(p => renderRankingPosition(p)).join('')}
  `;
}

function renderRankingPosition (rankingPosition) {
  const prettyWhen = prettifyWhen(rankingPosition.when);
  const prettyPosition = rankingPosition.position === 0 ? 'Not found' : `${rankingPosition.position}º`;
  return `
    <p class="normal dark fs2">${prettyWhen}: <span class="heavy">${prettyPosition}</span></p>
  `;
}

function prettifyWhen (w) {
  const y = w.getFullYear();
  const m = (w.getMonth() + 1).toString().padStart(2, '0');
  const d = (w.getDate() + 1).toString().padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function renderFooter (stakeId) {
  return `
    <footer class="normal grey fs2">
      <p class="normal greyish fs1">Report for Stake id ${stakeId}</p>
      <p>Made with <a href="https://github.com/joaomelo/attache">Attaché</a>. A open source project available at GitHub.</p>
    </footer>
  `;
}
