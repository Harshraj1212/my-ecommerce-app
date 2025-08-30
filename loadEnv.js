// loadEnv.js
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const result = dotenv.config({ path: path.resolve(__dirname, '.env') });

if (result.error) {
  console.log('Error loading .env file:', result.error);
} else {
  console.log('.env file loaded successfully');
  console.log('DB_HOST:', process.env.DB_HOST || 'NOT SET');
}