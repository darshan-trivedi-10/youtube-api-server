import express from 'express';
import bodyParser from 'body-parser';

import { connect } from './config/config.js';
import apiRouter from './router/index.js';

const app = express();

const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.listen(PORT, async () => {
    console.log("Server Started :) ");
    await connect();
})

app.get("/", (req, res) => {
    res.send("Hello :)");
})

process.on('uncaughtException', (err) => {
    console.log(`Error: ${err}`);
    console.log('Shutting down the server due to uncaught exception');
    process.exit(1);
});

// unhandled promise rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err}`);
    console.log('Shutting down the server due to unhandled exception');

    server.close(() => {
        process.exit(1);
    });
});