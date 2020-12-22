import { initMemoryDb } from '../interfaces/db';
import { axiosGet } from '../interfaces/get';
import { createScaleSerpSearch } from '../interfaces/search';
import { cycleRank } from '../domain/cycles';

async function main () {
  const db = initMemoryDb();
  db.stakes.push(
    {
      frequency: 'daily',
      pages: ['azure.microsoft.com', 'aws.amazon.com', 'firebase.google.com'],
      terms: ['cloud']
    },
    {
      frequency: 'weekly',
      pages: ['vuejs.org', 'reactjs.org', 'angular.io', 'svelte.dev'],
      terms: ['js front end library']
    }
  );

  const key = process.env.SCALE_SERP_KEY;
  const search = createScaleSerpSearch({ get: axiosGet, key });

  const rankings = await cycleRank({ db, search });

  rankings.forEach(ranking => console.log(ranking));
}

main();
