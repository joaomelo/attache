import { createId } from '../../helpers';

export function rankPage ({ page, snapshot }) {
  const { term, result, size, when } = snapshot;

  const position = result.reduce((acc, link, index) => {
    return link.includes(page) ? index : acc;
  }, -1);

  const ranking = {
    id: createId(),
    page,
    term,
    position,
    size,
    when
  };

  return ranking;
}
