import { initSqliteDb } from '../interfaces/db';
import { axiosGet } from '../interfaces/get';
import { createScaleSerpSearch } from '../interfaces/search';
import { cycleRank } from '../domain/cycles';

async function main () {
  const filename = process.env.SQLITE_FILENAME;
  const db = await initSqliteDb({ filename, reset: false });

  let stakes = await db.queryStakes();
  console.info(`${stakes.length} stakes found`);

  if (stakes.length === 0) {
    await db.saveStakes(fixtureStakes);
    stakes = await db.queryStakes();
    console.info(`feeded db, now with ${stakes.length} stakes`);
  }

  const key = process.env.SCALE_SERP_KEY;
  const search = createScaleSerpSearch({ get: axiosGet, key });

  console.info('rank cycle started...');
  await cycleRank({ db, search });
  console.info('the rank cycle was successful');

  const rankings = await db.queryRankings();
  console.info(`we have ${rankings.length} saved rankings:`);
  rankings.forEach(ranking => console.info(ranking));
}

main();
