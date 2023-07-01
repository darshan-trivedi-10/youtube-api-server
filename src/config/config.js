import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let keyPath = __dirname + '/key.json';

// Specify the relative path to the .env file
const envPath = path.resolve(__dirname, '../../.env');
// Load the environment variables from the .env file
dotenv.config({ path: envPath });


// Now you can access the environment variables
const DB_URL = process.env.DB_LINK;

const connect = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log("DB Connected");
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getAPIKey = async () => {
    try {
        const data = await fs.promises.readFile(keyPath, 'utf8');
        const { lastKey, API_KEY } = JSON.parse(data);
        return API_KEY[lastKey];
    } catch (error) {
        console.error('Error reading file:', error);
    }
}

const updateKey = async () => {
    try {
        const data = await fs.promises.readFile(keyPath, 'utf8');
        const keysData = JSON.parse(data);
        keysData["lastKey"] = (keysData["lastKey"] + 1) % keysData["API_KEY"].length;
        const updatedData = JSON.stringify(keysData);
        await fs.promises.writeFile(keyPath, updatedData, 'utf8');

    } catch (error) {
        console.error('Error reading file:', error);
    }
}

const addNewKey = async (key) => {
    try {
        const data = await fs.promises.readFile(keyPath, 'utf8');
        const keysData = JSON.parse(data);
        keysData["API_KEY"].push(key);
        const updatedData = JSON.stringify(keysData);
        await fs.promises.writeFile(keyPath, updatedData, 'utf8');
        return true;
    } catch (error) {
        console.error('Error reading file:', error);
        throw error;
    }
}

const getAllKey = async () => {
    try {
        const data = await fs.promises.readFile(keyPath, 'utf8');
        const keysData = JSON.parse(data);
        return keysData["API_KEY"];
    } catch (error) {
        console.error('Error reading file:', error);
        throw error;
    }
}


export {
    connect, addNewKey, updateKey, getAPIKey, getAllKey
}