const express = require('express');
const bodyParser = require('body-parser');
const firebase = require("firebase/app");
const googleApi = require('./googleApi');
const firebaseConfig = require('./firebaseConfig');
const fs = require('fs');
require("firebase/firestore");

firebase.initializeApp(firebaseConfig.config);
const firestore = firebase.firestore();

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
    const charge = req.headers.charge;
    const type = req.headers.type;
    const quantity = req.headers.quantity;
    const keywords = req.headers.keywords;

    let statutesViolated = '';
    let prescribedSentence = '';
    let rangeOfSentences = '';
    let similarCases = '';
    let sentencingEstimate = '';

    let caseRef = firestore.collection('research');
    let query = caseRef.get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.');
                return;
            }

            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
            })
        })
        .catch(err => {
            console.log('Error getting documents', err);
        })

    switch (charge) {
        case "Import and export of controlled drugs":
            statutesViolated = '7 Import and export of controlled drugs';
            break;
        case "Trafficking in controlled drugs":
            statutesViolated = '5 Trafficking in controlled drugs';
            break;
        case "Possession of controlled drugs":
            statutesViolated = '8 Possession of controlled drugs';
            break;
        case "Consumption of controlled drugs":
            statutesViolated = '8 Consumption of controlled drugs';
            break;
        case "Arranging or planning gatherings where controlled drugs are to be consumed or trafficked":
            statutesViolated = '11A Arranging or planning gatherings where controlled drugs are to be consumed or trafficked';
            break;
        case "Possession of pipes, utensils, etc.":
            statutesViolated = '9 Possession of pipes, utensils, etc.';
            break;

    }

    res.send({
        statutesViolated: statutesViolated,
        prescribedSentence: '2',
        rangeOfSentences: '3',
        similarCases: '4',
        sentencingEstimate: '5'
    });
})

app.listen(port, () => console.log(`Listening on port ${port}`));