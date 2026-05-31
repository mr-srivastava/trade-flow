import { Pool, type QueryResultRow } from 'pg';

/**
 * Shared Postgres connection pool for Supabase.
 *
 * The pool is cached on globalThis so Next.js dev hot-reloads don't open a new
 * pool on every change (which would exhaust connections). Supabase requires SSL.
 */
declare global {
  // eslint-disable-next-line no-var
  var _pgPool: Pool | undefined;
}

function createPool(): Pool {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set. Add it to .env.local.');
  }

  return new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
    // Keep the client-side pool small: we connect through Supabase's
    // transaction-mode pooler (port 6543), which multiplexes queries over a
    // limited number of server connections. A large `max` here can exhaust the
    // pooler ("max clients reached"). Also recycle idle connections promptly.
    max: 5,
    idleTimeoutMillis: 10_000,
  });
}

const pool: Pool = global._pgPool ?? createPool();
if (process.env.NODE_ENV !== 'production') {
  global._pgPool = pool;
}

/** Run a parameterized query and return the rows. */
export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[],
): Promise<T[]> {
  const result = await pool.query<T>(text, params as never);
  return result.rows;
}

export { pool };
