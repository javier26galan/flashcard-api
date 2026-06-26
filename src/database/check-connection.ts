import { sql } from "drizzle-orm";
import { db, pool } from "./client.js";

try {
  const result = await db.execute(
    sql`SELECT current_database() AS database_name, current_user AS database_user, NOW() AS connected_at`,
  );
  console.log("✅ PostgreSQL conectado");
  console.table(result.rows);
} catch (error) {
  console.error("❌ No se pudo conectar con PostgreSQL");
  console.error(error);

  process.exitCode = 1;
} finally {
  await pool.end();
}
