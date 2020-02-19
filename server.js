const express = require('express');
const bodyParser = require('body-parser');
const firebase = require("firebase/app");
const googleApi = require('./googleApi');
const fs = require('fs');
const {google} = require('googleapis');
require("firebase/firestore");

// Store firebase config
const config = {
    apiKey: "AIzaSyAWfGKenmRNuZiyMBEVFAwfAUja2zJsBO0",
    authDomain: "precedential-uspenguins.firebaseapp.com",
    databaseURL: "https://precedential-uspenguins.firebaseio.com",
    projectId: "precedential-uspenguins",
    storageBucket: "precedential-uspenguins.appspot.com",
    messagingSenderId: "170438518858",
    appId: "1:170438518858:web:917c0279abcb139fcd9eb3",
    measurementId: "G-CT2KKRQ34K"
};
firebase.initializeApp(config);

// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/database', (req, res) => {
    // Load client secrets from a local file.
    fs.readFile('credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Drive API.
        googleApi.authorize(JSON.parse(content), googleApi.downloadFile);
    });
    // TODO: Current a very hacky solution, ideally want to execute res.download() right after drive download
    setTimeout(() => {
        res.download('./database.xlsx')
    }, 2500);
});

app.get('/resources', (req, res) => {
    const file = "./resources.pdf"
    res.download(file);
});

app.get('/research', (req, res) => {
    console.log(req.headers.charge);
    console.log(req.headers.type);
    console.log(req.headers.quantity);
    console.log(req.headers.keywords);
    res.send({
        statutesViolated: '1',
        prescribedSentence: '2',
        rangeOfSentences: '3',
        similarCases: '4',
        sentencingEstimate: '5'
    });
})

app.listen(port, () => console.log(`Listening on port ${port}`));