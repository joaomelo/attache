import { research } from './research';

export async function runCycle ({ db, searcher }) {
  const stakes = await db.getAllStakes();

  const promises = [];
  stakes.forEach(stake => {
    promises.push(research({ stake }, { db, searcher }));
  });

  const reports = await Promise.all(promises);
  return reports.flat();
}
