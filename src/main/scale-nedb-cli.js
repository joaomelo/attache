import { initNedb } from '../interfaces/db';
import { axiosGet } from '../interfaces/get';
import { createScaleSerpSearch } from '../interfaces/search';
import { cycleRank } from '../domain/rank';
import { initUiService } from '../interfaces/view/cli';

async function main () {
  const filePrefix = process.env.NEDB_FILENAME_PREFIX;
  const db = await initNedb({ filePrefix, reset: false });

  const key = process.env.SCALE_SERP_KEY;
  const search = createScaleSerpSearch({ get: axiosGet, key });

  initUiService({
    queryStakes: () => db.queryStakes(),
    saveStake: stake => db.saveStakes([stake]),
    queryRankings: () => db.queryRankings(),
    cycleRank: () => cycleRank({ db, search })
  });
}

main();
