import { sortByField } from '../../helpers';
import { resetCss, typography, colors, sizing, position, effects } from './styles';
import { letterIcon } from './icons';

export function renderTrackReport (track) {
  const message = `
    <html>
      <head>
        ${resetCss}
        ${typography}
        ${colors}
        ${sizing}
        ${position}
        ${effects}
      </head>
      <body>
        <div class="p3 bg-nt-900">
          <main class="mw1 mauto p2 bg-nt-050 rounded">
            <h1 class="heavy dark fs4 mt1 text-center">Track Report</h1>
            ${track.terms.map(t => renderTerm(t)).join('')}
            ${renderFooter(track.stake.id)}
          </main>
        </div>
      </body>
    </html>
  `;

  const withoutBlankLines = message.replace(/^\s*$(?:\r\n?|\n)/gm, '');
  const withoutLeadingSpaces = withoutBlankLines.replace(/^\s+|\s+$/gm, '');
  return withoutLeadingSpaces;
}

function renderTerm (term) {
  return `
    <div class="p1">
      <div class="mt2 flex align-center greyish">
        ${letterIcon()}
        <h2 class="fs3 ml1 heavy">
          When searching for
          <span class="dark">${term.term}</span>
        </h2>
      </div>
      <div class="p1">
        ${renderTrend(term.trend)}
        ${term.rankings.map(r => renderRanking(r)).join('')}
      </div>
    </div>
  `;
}

function renderTrend (trend) {
  const sortedPosition = sortByField(trend, 'when', false);

  return `
    <h3 class="mt2 fs3 normal dark">
      The first pages were
    </h3>
    ${sortedPosition.map(p => renderTrendPosition(p)).join('')}
  `;
}

function renderTrendPosition (trendPosition) {
  const maxSize = 30;
  const prettyWhen = prettifyWhen(trendPosition.when);
  return `
    <p class="normal dark fs2">
      ${prettyWhen}: 
      <a href="${trendPosition.page}" class="heavy">
        ${trendPosition.page.substr(0, maxSize)}${trendPosition.page.length > maxSize ? '...' : ''}
      </a>
    </p>
  `;
};

function renderRanking (ranking) {
  const sortedPosition = sortByField(ranking.positions, 'when', false);
  return `
    <h3 class="normal dark fs3 mt2">
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
