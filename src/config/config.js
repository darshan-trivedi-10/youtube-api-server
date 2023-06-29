import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Specify the relative path to the .env file
const envPath = path.resolve(__dirname, '../../.env');

// Load the environment variables from the .env file
dotenv.config({ path: envPath });


// Now you can access the environment variables
const API_KEY = process.env.API_KEY;

export {
    API_KEY
}