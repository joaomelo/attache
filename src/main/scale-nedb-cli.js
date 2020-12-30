import { initNedb } from '../interfaces/db';
import { axiosGet } from '../interfaces/get';
import { createScaleSerpSearch } from '../interfaces/search';
import { cycleRank } from '../domain/rank';
import { initUiService } from '../interfaces/view/cli';
import { listStakes, addStake, deleteStake } from '../domain/stakes';
import { listRankings } from '../domain/rankings';

async function main () {
  const filePrefix = process.env.NEDB_FILENAME_PREFIX;
  const db = await initNedb({ filePrefix, reset: false });

  const key = process.env.SCALE_SERP_KEY;
  const search = createScaleSerpSearch({ get: axiosGet, key });

  initUiService({
    listStakes: () => listStakes({ db }),
    addStake: stake => addStake({ stake }, { db }),
    deleteStake: id => deleteStake({ id }, { db }),
    listRankings: () => listRankings({ db }),
    cycleRank: () => cycleRank({ db, search })
  });
}

main();
