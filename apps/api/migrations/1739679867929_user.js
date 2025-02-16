/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {

 pgm.sql(`
    CREATE TABLE IF NOT EXISTS "users" (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(500) NOT NULL,
  phone VARCHAR(20),
  dob TIMESTAMP,
  gender VARCHAR(1) NOT NULL CHECK (gender IN ('m', 'f', 'o')),
  address VARCHAR(256),
  role_id INTEGER REFERENCES role(id) ,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
)

    `)


 }

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
      pgm.sql("DROP TABLE IF EXISTS users")

};
