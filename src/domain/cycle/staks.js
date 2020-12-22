import { createIsRanked } from './is-ranked';
import { rank } from './rank';

export async function rankStakes ({ stake }, { searcher, db }) {
  const isRanked = await createIsRanked({ frequency: stake.frequency }, { db });

  const promises = [];

  stake.pages.forEach(page => {
    stake.terms.forEach(term => {
      if (!isRanked(page, term)) {
        promises.push(rank({ page, term, size: 1000 }, { searcher }));
      }
    });
  });

  const report = await Promise.all(promises);
  await db.saveReport(report);

  return report;
}
