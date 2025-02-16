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
        INSERT INTO "users" (first_name, last_name, email, password, phone, dob, gender, address, role_id, created_at, updated_at) 
VALUES 
('sabin', 'suwal', 'sabin@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$Q/FruoP6SAclnnszGjvuzQ$5DlaMwxS8V20xjtnjLM3oSA7LZsEjYLushNbw4wNY7s', '0000000000', '2000-05-15', 'm', 'bhaktapur', 1, NOW(), NOW());

        `)

};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
      pgm.sql("TRUNCATE TABLE IF EXISTS users");


};
