const express = require('express')
const mongoose = require('mongoose');
// import env vars from config file
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT} = require("./config/config");

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
// 172.26.0.2 = docker mongo container ip address
// mongo refers to ip address of mongo container 
mongoose
    .connect(mongoURL, {
        // get rid of warnings
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log("Successfully connected to Mongo DB"))
    .catch((e) => console.log(e));

app.get("/", (req, res) => {
    res.send("<h1>Hello from Node Express App! </h1>")
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`))