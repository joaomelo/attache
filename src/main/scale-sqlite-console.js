import { initSqliteDB } from '../interfaces/db';
import { stakes as fixtureStakes } from '../../tests/fixtures';
// import { axiosGet } from '../interfaces/get';
// import { createScaleSerpSearch } from '../interfaces/search';
// import { cycleRank } from '../domain/cycles';

async function main () {
  const filename = process.env.SQLITE_FILENAME;
  const db = await initSqliteDB({ filename, reset: false });

  const stakes = await db.queryStakes();
  console.info(`${stakes.length} stakes found`);

  if (stakes.length === 0) {
    const saveResult = await db.saveStakes(fixtureStakes);
    console.info(`feeded db, now with ${saveResult} records`);
  }

  // const key = process.env.SCALE_SERP_KEY;
  // const search = createScaleSerpSearch({ get: axiosGet, key });

  // const rankings = await cycleRank({ db, search });

  // rankings.forEach(ranking => console.info(ranking));
}

main();
