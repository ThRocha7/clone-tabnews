import database from "infra/database";

async function status(request, response) {
  const updateAt = new Date().toISOString();

  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseMaxConnResult = await database.query("SHOW max_connections;");
  const databaseMaxConnValue = databaseMaxConnResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnResult = await database.query({
    text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1",
    values: [databaseName],
  });
  const databaseOpenedConnValue = databaseOpenedConnResult.rows[0].count;

  response.status(200).json({
    update_at: updateAt,
    dependecies: {
      database: {
        max_connections: parseInt(databaseMaxConnValue),
        opened_connections: databaseOpenedConnValue,
        version: databaseVersionValue,
      },
    },
  });
}

export default status;
