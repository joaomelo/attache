import { initMemoryDb } from '../2-interfaces/db';
import { axiosGet } from '../2-interfaces/get';
import { createScaleSerpSearcher } from '../2-interfaces/search';
import { runCycle } from '../1-domain';

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
  const searcher = createScaleSerpSearcher({ get: axiosGet, key });

  const result = await runCycle({ db, searcher });

  result.forEach(result => console.log(result));
}

main();
