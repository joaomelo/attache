import { initDb } from '../interfaces/db';
import { get } from '../interfaces/request';
import { createScaleSerpSearch } from '../interfaces/search';
import { schedule } from '../interfaces/scheduler';
import { saveFreshSnapshotsForStakes } from '../domain/snapshots';

async function main () {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('Mongo URI not found as environment variable');
  const db = await initDb('mongo', { uri });

  const key = process.env.SCALE_SERP_KEY;
  if (!key) throw new Error('SCALE SERP api key not found as environment variable');
  const search = createScaleSerpSearch({ get, key });

  const callback = async () => {
    await saveFreshSnapshotsForStakes(db, search);
    console.info('snapshot just ran');
  };

  const oneHourInMinutes = 60;
  const frequency = parseInt(process.env.SNAPSHOOTER_FREQUENCY) || oneHourInMinutes;

  schedule(callback, frequency);
}

main();
