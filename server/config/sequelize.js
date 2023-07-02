const path = require("path");
const {Sequelize} = require("sequelize");

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
  if(postgresParams.some(v => v)){
    console.log("Some Postgres variable(s) missing; using Sqlite database as fall-back");
  }
}

const postgresString = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`;

const sqliteConfig = {
  dialect: "sqlite",
  storage: path.join(
    __dirname, "..", "..", "database.sqlite3"
  ),
  logging: false
};

const sequelize = usePostgres ?
  new Sequelize(
    postgresString, {logging: false}
  )
  :
  new Sequelize(sqliteConfig);

sequelize.authenticate()
  .then(() => console.log("Database successfully connected"))
  .catch(e => {
    console.log(e);
    throw new Error("Database failed to connect.");
  });

module.exports = sequelize;