const Pool = require("pg").Pool
require("dotenv").config()

//const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD.toString()}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`

// Configuration de la connexion à la base de données
const pool = new Pool({
  connectionString: 'postgres://tommy:GXpAa56TvXdaCCmi2PKzQqDmuOLMGQPE@dpg-chp1nhm7avjb90hd9m90-a.oregon-postgres.render.com/musicboxd',
  ssl: true, // Activer SSL pour les connexions sécurisées
});

module.exports = pool
