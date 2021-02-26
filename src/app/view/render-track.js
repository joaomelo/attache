import { sortByField } from '../../helpers';
import { resetCss, typography, colors, sizing, position, effects } from './styles';
import { letterIcon, firstIcon, pageIcon } from './icons';

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
          <main class="wm1 mauto p2 bg-nt-050 rounded">
            ${renderTitle()}
            ${renderJoin(track.terms, renderTerm)}
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

function renderTitle () {
  return `
    <h1 class="heavy cl-nt-900 fs4 mt1 mb2 text-center">Track Report</h1>
    ${renderLine()}   
  `;
}

function renderTerm (term) {
  return `
    <section class="mt2 ml1 mr1 p1">
      <span class="flex align-center cl-pr-900">
        ${letterIcon()}
        <h2 class="ml1 fs3">
          <span class="normal cl-nt-400">Searching for</span>
          <span class="heavy">${term.term}</span>
        </h2>
      </span>
      <div class="p2">
        ${renderTrend(term.trend)}
        ${renderJoin(term.rankings, renderRanking)}
      </div>
    </section>
  `;
}

function renderTrend (trend) {
  const sortedPosition = sortByField(trend, 'when', false);

  return `
    <span class="mb1 flex align-center cl-pr-900">
      ${firstIcon(24)}
      <h3 class="fs3 normal">
        <span class="ml1">First</span>
        <span class="cl-nt-400">results were</span>
      </h3>
    </span>
    ${renderJoin(sortedPosition, renderTrendPosition)}
  `;
}

function renderTrendPosition (trendPosition) {
  const maxSize = 30;
  const prettyWhen = prettifyWhen(trendPosition.when);
  return `
    <p class="normal cl-nt-900 fs2">
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
    <span class="mt2 mb1 flex align-center cl-pr-900">
      ${pageIcon(24)}
      <h3 class="fs3 normal">
        <span class="ml1 cl-nt-400">Page</span>
        <span class="heavy">${ranking.page}</span>
        <span class="cl-nt-400">ranked</span>
      </h3>
    </span>
    ${renderJoin(sortedPosition, renderRankingPosition)}
  `;
}

function renderRankingPosition (rankingPosition) {
  const prettyWhen = prettifyWhen(rankingPosition.when);
  const prettyPosition = rankingPosition.position === 0 ? 'Not found' : `${rankingPosition.position}º`;
  return `
    <p class="normal cl-nt-900 fs2">${prettyWhen}: <span class="heavy">${prettyPosition}</span></p>
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
    ${renderLine()}
    <footer class="p1 mt2">
      <p class="normal cl-nt-400 fs1">Track report for Stake ${stakeId}</p>
      <p class="mt1 normal fs2 cl-nt-700">
        Made with <a class="underline" target="_blank" href="https://github.com/joaomelo/attache">Attaché</a>. A open source project available at GitHub.
      </p>
    </footer>
  `;
}

function renderLine () {
  return '<hr style="border-top: 1px solid #BCCCDC">';
}

function renderJoin (array, render) {
  return array.map(i => render(i)).join('');
}
