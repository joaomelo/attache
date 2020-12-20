import { rank } from './rank';

export async function research ({ stake, size }, { searcher, db }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayRankings = db.getRankingsSince(today);
  const isAlreadyRanked = (page, term) => todayRankings.find(r => r.page === page && r.term === term);

  const promises = [];

  stake.pages.forEach(page => {
    stake.terms.forEach(term => {
      if (!isAlreadyRanked(page, term)) {
        promises.push(rank({ page, term, size }, { searcher }));
      }
    });
  });

  const report = await Promise.all(promises);
  await db.saveReport(report);

  return report;
}
