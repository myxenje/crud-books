const config = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST || 'db',
    port: Number(process.env.DB_PORT) || 3306,
    database: process.env.DB_NAME || 'crudbook_db',
    user: process.env.DB_USER || 'docker',
    password: process.env.DB_PASSWORD || 'docker123',
  },
  migrations: {
    directory: './src/database/migrations',
  },
  useNullAsDefault: true,
};

module.exports = {
  development: config,
  production: config,
};