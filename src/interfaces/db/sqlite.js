import initKnex from 'knex';

async function syncSchema ({ knex, reset }) {
  if (reset) {
    await Promise.all([
      knex.schema.dropTable('stakes'),
      knex.schema.dropTable('rankings'),
      knex.schema.dropTable('snapshots')
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

  await knex.schema.hasTable('snapshots').then(exists => {
    if (!exists) {
      return knex.schema.createTable('snapshots', t => {
        t.uuid('id').primary();
        t.text('term');
        t.text('when');
        t.boolean('success');
        t.text('error');
        t.integer('size');
        t.text('result');
      });
    }
  });
}

export async function initSqliteDb ({ memory, filename, reset }) {
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
        ...record,
        pages: JSON.parse(record.pages),
        terms: JSON.parse(record.terms)
      }));
      return stakes;
    },

    async saveStakes (stakes) {
      const dbStakes = stakes.map(stake => ({
        ...stake,
        pages: JSON.stringify(stake.pages),
        terms: JSON.stringify(stake.terms)
      }));
      await knex('stakes').insert(dbStakes);
      return true;
    },

    async querySnapshots () {
      const dbSnapshots = await knex.select().table('snapshots');
      const snapshots = dbSnapshots.map(record => ({
        ...record,
        success: !!record.success,
        when: new Date(record.when),
        result: JSON.parse(record.result)
      }));

      return snapshots;
    },

    async saveSnapshots (snapshots) {
      const dbSnapshots = snapshots.map(snapshot => ({
        ...snapshot,
        when: snapshot.when.toISOString(),
        result: JSON.stringify(snapshot.result)
      }));

      await knex('snapshots').insert(dbSnapshots);
      return true;
    },

    async queryRankings () {
      const dbRankings = await knex.select().table('rankings');
      const rankings = dbRankings.map(record => ({
        ...record,
        when: new Date(record.when)
      }));
      return rankings;
    },

    async saveRankings (rankings) {
      const dbRankings = rankings.map(rankings => ({
        ...rankings,
        when: rankings.when.toISOString()
      }));
      await knex('rankings').insert(dbRankings);

      return true;
    }

  };
};
