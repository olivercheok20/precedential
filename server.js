const express = require('express');
const bodyParser = require('body-parser');
const firebase = require("firebase/app");
require("firebase/firestore");

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

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Chaitanya
app.get('/database', (req, res) => {
    const file = "./database.csv"
    res.download(file);
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