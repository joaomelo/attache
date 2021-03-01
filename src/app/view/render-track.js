import { sortByField } from '../../helpers';
import { style, baseCss, text, position, colors, sizes, effects } from './styles';
import { letterIcon, firstIcon, pageIcon } from './icons';

export function renderTrackReport (track) {
  const message = `
    <html>
      <head>${baseCss}</head>
      <body>
        <div ${style(
          colors.bg.p9,
          sizes.padding.p3
        )}>
          <main ${style(
            sizes.width.max1,
            sizes.margin.auto,
            sizes.padding.p2,
            colors.bg.n1,
            effects.rounded
          )}>
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
    <h1 ${style(
      text.weight.heavy,
      text.size.s4,
      text.align.center,
      colors.cl.n9,
      sizes.margin.mt1,
      sizes.margin.mb2
    )}>
      Track Report
    </h1>
    ${renderLine()}   
  `;
}

function renderTerm (term) {
  return `
    <div ${style(
      sizes.margin.mt2,
      sizes.margin.ml1,
      sizes.margin.mr1,
      sizes.padding.p1
    )}>
      <span ${style(
        position.flex,
        position.align.center,
        colors.cl.p9,
        text.weight.heavy,
        text.size.s3
      )}>
        ${letterIcon()}
        <h2>
          <span ${style(
            text.weight.normal,
            sizes.margin.ml1,
            colors.cl.n4
          )}>
            Searching for
          </span>
          ${term.term}
        </h2>
      </span>
      <div ${style(sizes.padding.p2)}>
        ${renderTrend(term.trend)}
        ${renderJoin(term.rankings, renderRanking)}
      </div>
    </div>
  `;
}

function renderTrend (trend) {
  const sortedPosition = sortByField(trend, 'when', false);

  return `
    <span ${style(
      position.flex,
      position.align.center,
      sizes.margin.mb1,
      colors.cl.p9,
      text.size.s3,
      text.weight.heavy
    )}>
      ${firstIcon(24)}
      <h3 ${style(sizes.margin.ml1)}>
        First
        <span ${style(
          colors.cl.n7,
          text.weight.normal
        )}>
          results were
        </span>
      </h3>
    </span>
    ${renderJoin(sortedPosition, renderTrendPosition)}
  `;
}

function renderTrendPosition (trendPosition) {
  const maxSize = 30;
  const prettyWhen = prettifyWhen(trendPosition.when);
  return `
    <p ${style(
      text.weight.normal,
      text.size.s2,
      colors.cl.n9
    )}>
      ${prettyWhen}: 
      <a 
        ${style(text.weight.heavy)}
        href="${trendPosition.page}"
      >
        ${trendPosition.page.substr(0, maxSize)}${trendPosition.page.length > maxSize ? '...' : ''}
      </a>
    </p>
  `;
};

function renderRanking (ranking) {
  const sortedPosition = sortByField(ranking.positions, 'when', false);
  return `
    <span 
      ${style(
        position.flex,
        position.align.center,
        sizes.margin.mt2,
        sizes.margin.mb1,
        colors.cl.p9,
        text.weight.heavy,
        text.size.s3
      )}>
      ${pageIcon(24)}
      <h3>
        <span ${style(
          sizes.margin.ml1,
          colors.cl.n7,
          text.weight.normal
        )}>
          Page
        </span>
        ${ranking.page}
        <span ${style(
          colors.cl.n7,
          text.weight.normal
        )}>
          ranked
        </span>
      </h3>
    </span>
    ${renderJoin(sortedPosition, renderRankingPosition)}
  `;
}

function renderRankingPosition (rankingPosition) {
  const prettyWhen = prettifyWhen(rankingPosition.when);
  const prettyPosition = rankingPosition.position === 0 ? 'Not found' : `${rankingPosition.position}º`;
  return `
    <p ${style(
      text.weight.normal,
      text.size.s2,
      colors.cl.n9
    )}>
      ${prettyWhen}: 
      <span ${style(text.weight.heavy)}>
        ${prettyPosition}
      </span>
    </p>
  `;
}

function renderFooter (stakeId) {
  return `
    ${renderLine()}
    <div ${style(
      sizes.padding.p1,
      sizes.margin.mt2
    )}>
      <p ${style(
        text.weight.normal,
        text.size.s1,
        colors.cl.n3
      )}>
        Track report for Stake ${stakeId}
      </p>

      <p ${style(
        sizes.margin.mt1,
        text.weight.normal,
        text.size.s2,
        colors.cl.n7
      )}>
        Made with 
        <a 
          ${style(text.underline)}
          target="_blank" 
          href="https://github.com/joaomelo/attache"
        >
          Attaché
        </a>
        . 
        A open source project available at GitHub.
      </p>
    </div>
  `;
}

function renderLine () {
  return `<hr ${style(effects.line)}>`;
}

function renderJoin (array, render) {
  return array.map(i => render(i)).join('');
}

function prettifyWhen (w) {
  const y = w.getFullYear();
  const m = (w.getMonth() + 1).toString().padStart(2, '0');
  const d = (w.getDate() + 1).toString().padStart(2, '0');
  return `${y}-${m}-${d}`;
}
