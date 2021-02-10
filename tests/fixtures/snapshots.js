import { createId, calcSomedayFromToday } from '../../src/helpers';

export const snapshots = [
  { ...cloudTemplate(), success: false },
  { ...cloudTemplate(-1), result: ['azure.microsoft.com', 'www.some-page.com', 'www.another-page.net'] },
  { ...cloudTemplate(-2), result: ['www.some-page.com', 'azure.microsoft.com', 'www.another-page.net'] },
  { ...cloudTemplate(-3), result: ['www.some-page.com', 'www.another-page.net', 'azure.microsoft.com'] },
  { ...cloudTemplate(-4), success: false },
  { ...cloudTemplate(-5), result: ['www.some-page.com', 'azure.microsoft.com', 'www.another-page.net'] },
  { ...cloudTemplate(-6), result: ['www.some-page.com', 'azure.microsoft.com', 'www.another-page.net'] },
  { ...cloudTemplate(-7), result: ['www.some-page.com', 'azure.microsoft.com', 'www.another-page.net'] }
];

function cloudTemplate (delta) {
  const when = delta ? calcSomedayFromToday(delta) : new Date();

  return {
    id: createId(),
    term: 'cloud',
    size: 3,
    when,
    success: true
  };
};
