import { createId } from '../../helpers';

export function listStakes ({ db }) {
  return db.queryStakes();
}

export function addStake ({ stake }, { db }) {
  const { pages, terms } = stake;
  if (!Array.isArray(pages)) throw new Error('Can not add stake with invalid pages array');
  if (!Array.isArray(terms)) throw new Error('Can not add stake with invalid terms array');

  return db.saveStakes([{
    id: createId(),
    pages,
    terms
  }]);
}

export function deleteStake ({ id }, { db }) {
  return db.deleteStake(id);
}
