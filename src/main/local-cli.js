import { initMongo } from '../app/db';
import { axiosGet } from '../app/get';
import { createScaleSerpSearch } from '../app/search';
import { cycleRank } from '../domain/rank';
import { initCliUi } from '../app/view/cli';
import { listStakes, addStake, deleteStake } from '../domain/stakes';
import { listRankings } from '../domain/rankings';

async function main () {
  const uri = process.env.NEDB_FILENAME_PREFIX;
  const db = await initMongo({ uri, reset: false });

  const key = process.env.SCALE_SERP_KEY;
  const search = createScaleSerpSearch({ get: axiosGet, key });

  initCliUi({
    listStakes: () => listStakes({ db }),
    addStake: stake => addStake({ stake }, { db }),
    deleteStake: id => deleteStake({ id }, { db }),
    listRankings: () => listRankings({ db }),
    cycleRank: () => cycleRank({ db, search })
  });
}

main();