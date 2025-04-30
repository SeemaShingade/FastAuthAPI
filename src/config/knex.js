import dotenv from 'dotenv'
import knex from 'knex'

// Load environment variables from .env file
// Ensure you have a .env file with the required variables
dotenv.config();

// Check if environment variables are loaded correctly
console.log('✅ Environment variables loaded successfully!');

// Initialize Knex with PostgreSQL configuration
// Ensure you have the required environment variables set in your .env file
  const db = knex({
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
  });
  
    // Test the database connection
  db.raw('SELECT 1')
    .then(() => console.log('✅ Database connected successfully!'))
    .catch((err) => console.error('❌ Database connection error:', err));
  
    // Export the Knex instance for use in your application
  export default db;
  