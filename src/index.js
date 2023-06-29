import express from 'express';

const app = express();

const PORT = 5000;

app.listen(PORT, async () => {
    console.log("Server Started :) ");
})


app.get("/", (req, res) => {
    res.send("Hello :)");
})