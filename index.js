const express = require('express')
const mongoose = require('mongoose');
// import env vars from config file
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT} = require("./config/config");

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

// retry logic to keep checking for mongo db
const connnectWithRetry = () => {
    mongoose
        .connect(mongoURL, {
            // get rid of warnings
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        .then(() => console.log("Successfully connected to Mongo DB"))
        .catch((e) => {
            console.log(e)
            setTimeout(connnectWithRetry, 5000)
        });
}

// to test retry logic use this by only starting node-app:  docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --no-deps node-app
connnectWithRetry();

app.get("/", (req, res) => {
    res.send("<h1>Hello from Node Express App! </h1>")
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`))