const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL, // this par uses DATABASE_URL from .env
  ssl: { rejectUnauthorized: false },
});

client.connect()
  .then(() => console.log('Connected to Supabase PostgreSQL ✅'))
  .catch(err => console.error('Database connection error:', err));

module.exports = client;
