import initKnex from 'knex';

export async function initSqliteDB ({ memory, filename, reset }) {
  const connection = memory ? ':memory:' : { filename };
  const knex = initKnex({
    client: 'sqlite3',
    connection,
    useNullAsDefault: true
  });

  if (reset) {
    await knex.schema.dropTable('stakes');
  }

  await knex.schema.hasTable('stakes').then(exists => {
    if (!exists) {
      return knex.schema.createTable('stakes', t => {
        t.uuid('id').primary();
        t.text('frequency');
        t.text('pages');
        t.text('terms');
      });
    }
  });

  return {
    async queryStakes () {
      const dbStakes = await knex.select().table('stakes');
      const stakes = dbStakes.map(record => ({
        id: record.id,
        frequency: record.frequency,
        pages: JSON.parse(record.pages),
        terms: JSON.parse(record.terms)
      }));
      return stakes;
    },

    saveStakes (stakes) {
      const dbStakes = stakes.map(stake => ({
        id: stake.id,
        frequency: stake.frequency,
        pages: JSON.stringify(stake.pages),
        terms: JSON.stringify(stake.terms)
      }));
      return knex('stakes').insert(dbStakes);
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
