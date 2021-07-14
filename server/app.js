require('dotenv').config();
const { response, request } = require('express');
const express = require('express');
const path = require('path');
const app = express();
const csvtojson = require('csvtojson');
//my imports
const Player = require('./classes/Player.js');
const API = require('./classes/Api.js');

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});
app.use(express.static(path.join(__dirname, '../public'), { extensions: ['html', 'htm'] }));


//serves when the client requests for player information
app.get("/api/player/:tag", (request, response) => {
    let tag = request.params.tag;

    const url = `https://api.brawlstars.com/v1/players/%23${tag}`;
    const api = new API(url);

    api.postData().then((data) => {
        if (data.reason) {
            if (data.reason == "notFound") {
                response.status(404).json({
                    error: "true",
                    reason: data.reason
                });
            } else {
                response.status(429).json({
                    error: "true",
                    reason: data.reason
                });
            }
        } else {
            const player = new Player(data);
            response.json(JSON.stringify(player));
        }
    });
});


app.get("/api/csv/:filename", (request, response) => {
    const fileName = request.params.filename;
    const csvpath = path.join(__dirname, `../public/assets/csv/${fileName}.csv`);
    csvtojson({
        checkType: true
    }).fromFile(csvpath).then((json) => {
        response.json(JSON.stringify(json));
    }).catch(error => {
        response.status(404).send({ error });
    });

});

app.get("/api/csv/csv_logic/:filename", (request, response) => {
    const fileName = request.params.filename;
    const csvpath = path.join(__dirname, `../public/assets/csv/csv_logic/${fileName}.csv`);

    csvtojson({
        checkType: true
    }).fromFile(csvpath).then((json) => {
        response.json(JSON.stringify(json));
    });
});

app.get("/player/:tag", (request, response) => {
    response.sendFile("player.html", {
        root: path.join(__dirname, '../public')
    });
});
