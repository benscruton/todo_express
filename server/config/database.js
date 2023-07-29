// Get Postgres params
const {
  POSTGRES_PORT,
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB
} = process.env;

// Collect Postgres params to check completeness
const postgresParams = [
  POSTGRES_PORT,
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB
];

let usePostgres = true;
if(!postgresParams.every(v => v)){
  usePostgres = false;
}

const development = (usePostgres ?
  {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: 'postgres'
  }
  :
  {
    dialect: "sqlite",
    storage: "./database.sqlite3"
  }
);

module.exports = {
  development
};