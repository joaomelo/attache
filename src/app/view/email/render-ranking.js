import { sortByField } from '../../../helpers';

export function renderRanking (ranking) {
  return `    
    <h1>Ranking Report</h1>
    ${ranking.terms.map(t => renderTerm(t)).join('')}
  `;
}

function renderTerm (term) {
  return `
    <h2>${term.term}</h2>
    ${term.pages.map(p => renderPage(p)).join('')}
  `;
}

function renderPage (page) {
  const sortedPosition = sortByField(page.positions, 'when', false);

  return `
    <h3>${page.page}</h3>
    ${sortedPosition.map(p => renderPosition(p)).join('')}
  `;
}

function renderPosition (position) {
  const prettyWhen = prettifyWhen(position.when);
  const prettyPosition = position.position === 0 ? 'Not found' : `${position.position}º`;
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
