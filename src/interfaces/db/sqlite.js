import initKnex from 'knex';

async function syncSchema ({ knex, reset }) {
  if (reset) {
    await Promise.all([
      knex.schema.dropTable('stakes'),
      knex.schema.dropTable('rankings')
    ]);
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

  await knex.schema.hasTable('rankings').then(exists => {
    if (!exists) {
      return knex.schema.createTable('rankings', t => {
        t.uuid('id').primary();
        t.text('page');
        t.text('term');
        t.integer('position');
        t.integer('size');
        t.text('when');
      });
    }
  });
}

export async function initSqliteDB ({ memory, filename, reset }) {
  const connection = memory ? ':memory:' : { filename };
  const knex = initKnex({
    client: 'sqlite3',
    connection,
    useNullAsDefault: true
  });

  await syncSchema({ knex, reset });

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
    },

    async queryRankings () {
      const dbRankings = await knex.select().table('rankings');
      const rankings = dbRankings.map(record => ({
        ...record,
        when: new Date(record.when)
      }));
      return rankings;
    },

    saveRankings (rankings) {
      const dbRankings = rankings.map(rankings => ({
        ...rankings,
        when: rankings.when.toISOString()
      }));
      return knex('rankings').insert(dbRankings);
    }

  };
};
