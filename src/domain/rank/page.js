import { v4 as uuidv4 } from 'uuid';

export function rankPage ({ page, snapshot }) {
  const { term, result, size, when } = snapshot;

  const position = result.reduce((acc, link, index) => {
    return link.includes(page) ? index : acc;
  }, -1);

  const ranking = {
    id: uuidv4(),
    page,
    term,
    position,
    size,
    when
  };

  return ranking;
}
