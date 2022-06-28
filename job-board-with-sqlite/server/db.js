import knex from 'knex';
import DataLoader from 'dataloader';

export const db = knex({
  client: 'better-sqlite3',
  connection: {
    filename: './data/db.sqlite3',
  },
  useNullAsDefault: true,
});

db.on('query', (query) => {
  console.log('[db]', query.sql, query.bindings);
});

export function createCompanyLoader() {
  return new DataLoader(async (companyIds) => {
    console.log('[companyLoader]: ', companyIds);
    const companies = await db
      .select()
      .from('companies')
      .whereIn('id', companyIds);
    return companyIds.map((id) =>
      companies.find((company) => company.id === id)
    );
  });
}

// export const companyLoader = new DataLoader(async (companyIds) => {
//   const companies = await db
//     .select()
//     .from('companies')
//     .whereIn('id', companyIds);
//   return companyIds.map((id) => companies.find((company) => company.id === id));
// });
