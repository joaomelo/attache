import initKnex from 'knex';

export async function initSqliteDB ({ filename, reset }) {
  const knex = initKnex({
    client: 'sqlite3',
    connection: { filename }
  });

  if (reset) {
    console.info('resetind sqlite database');
    await knex.schema.dropTable('stakes');
  }

  await knex.schema.hasTable('stakes').then(exists => {
    if (!exists) {
      return knex.schema.createTable('stakes', t => {
        t.uuid('id').primary();
        t.text('frequency');
        t.json('pages');
        t.json('terms');
      });
    }
  });

  return {
    queryStakes () {
      return knex.select().table('stakes');
    },

    saveStakes (stakes) {
      const dataStakes = stakes.map(stake => ({
        frequency: stake.frequency,
        pages: stake.pages,
        terms: stake.terms
      }));
      return knex('stakes').insert(dataStakes);
    }

    // queryRankingsSince (date) {
    //   const rankingsSince = this.rankings.filter(ranking => ranking.when >= date);
    //   return Promise.resolve(rankingsSince);
    // },

    // saveRankings (rankings) {
    //   rankings.forEach((value, key) => {
    //     this.rankings[key] = value;
    //   });
    //   return Promise.resolve(true);
    // }
  };
};
