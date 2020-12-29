import { initNedb } from '../interfaces/db';
import { axiosGet } from '../interfaces/get';
import { createScaleSerpSearch } from '../interfaces/search';
import { cycleRank } from '../domain/rank';

async function main () {
  const filePrefix = process.env.NEDB_FILENAME_PREFIX;
  const db = await initNedb({ filePrefix, reset: false });

  let stakes = await db.queryStakes();
  console.info(`${stakes.length} stakes found`);

  if (stakes.length === 0) {
    const fixtureStakes = [
      {
        id: '87178090-383e-4780-a363-a076a6f952dd',
        pages: ['azure.microsoft.com', 'aws.amazon.com', 'firebase.google.com'],
        terms: ['cloud']
      },
      {
        id: 'd1584b65-7361-46ee-a807-e1a3ec0ddb33',
        pages: ['vuejs.org', 'reactjs.org', 'angular.io', 'svelte.dev'],
        terms: ['js front end library']
      }
    ];
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
