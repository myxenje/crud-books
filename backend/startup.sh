set -e

npx knex migrate:latest

exec node src/index.js