require('dotenv').config();
const env = process.env.NODE_ENV || 'development';
const dialect = process.env.DB_DIALECT;
const url = `${dialect}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

module.exports = {
  [env]: {
    dialect,
    url,
    migrationStorageTableName: '_migrations'
  }
};
