const express = require('express')
const mongoose = require('mongoose');

const app = express();

// 172.26.0.2 = docker mongo container ip address
// mongo refers to ip address of mongo container
mongoose
    .connect("mongodb://anish:mypassword@mongo:27017/?authSource=admin")
    .then(() => console.log("Successfully connected to Mongo DB"))
    .catch((e) => console.log(e));

app.get("/", (req, res) => {
    res.send("<h1>Hello from Node Express App! </h1>")
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`))