const pg = require("pg");
const { Pool } = pg;

const pool = new Pool({
  // eslint-disable-next-line no-undef
  connectionString: process.env.DB_CONNECT,
});

module.exports = pool;
