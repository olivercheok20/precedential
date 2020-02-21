const express = require('express');
const bodyParser = require('body-parser');
const firebase = require("firebase/app");
const googleApi = require('./googleApi');
const firebaseConfig = require('./firebaseConfig');
const { allSimilarCasesData } = require('./similarCases');
const { compareHelper, heuristic, sortByHeuristic } = require('./heuristic');
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
    const file = "./LIP Resources v4 210220.pdf"
    res.download(file);
});

app.get('/research', async (req, res) => {
    const charge = req.headers.charge;
    const type = req.headers.type;
    const quantity = req.headers.quantity;
    const keywords = req.headers.keywords.split(",");
    // console.log(keywords);

    let class_of_drug = '';

    let statutesViolated = '';
    let prescribedSentence = '';
    let rangeOfSentences = '';
    let similarCases = '';
    let sentencingEstimate = '';

    let cases = [];

    let caseRef = firestore.collection('research');
    let query = await caseRef.get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.');
                return;
            }

            snapshot.forEach(doc => {
                docData = doc.data()
                // console.log(doc.id, '=>', docData);
                cases.push(docData);
            })
        })
        .catch(err => {
            console.log('Error getting documents', err);
        })

    similarCasesData = allSimilarCasesData(cases, charge, type);
    // console.log("Before sorting");
    // for (var i = 0; i < similarCasesData.similarCases.length; i++) {
    //     console.log(heuristic(similarCasesData.similarCases[i], quantity, keywords));
    // }
    similarCases = sortByHeuristic(similarCasesData.similarCases, quantity, keywords);
    // console.log("After sorting");
    // for (var i = 0; i < similarCases.length; i++) {
    //     console.log(heuristic(similarCases[i], quantity, keywords));
    // }
    minimumStrokes = similarCasesData.minimumStrokes;
    maximumStrokes = similarCasesData.maximumStrokes;
    minimumMonths = similarCasesData.minimumMonths;
    maximumMonths = similarCasesData.maximumMonths;
    minimumFine = similarCasesData.minimumFine;
    maximumFine = similarCasesData.maximumFine;
    minimumMonthsInReform = similarCasesData.minimumMonthsInReform;
    maximumMonthsInReform = similarCasesData.maximumMonthsInReform;


    if ((maximumMonthsInReform > 0) && maximumMonths == 0) {
        rangeOfSentences = ["Maximum months in reformative training: " + maximumMonthsInReform];
        rangeOfSentences.push("Minimum months in reformative training: " + minimumMonthsInReform);
        rangeOfSentences.push("");
    } else {

        if (Number.isInteger(maximumMonths / 12)) {
            if (Number.isInteger(minimumMonths / 12)) {
                rangeOfSentences = ["Maximum " + maximumMonths / 12 + " years; Minimum " + minimumMonths / 12 + " years"]
            } else {
                rangeOfSentences = ["Maximum " + maximumMonths / 12 + " years; Minimum " + Math.floor(minimumMonths / 12) + " years " + minimumMonths % 12 + " months"]
            }
        } else {
            if (Number.isInteger(minimumMonths / 12)) {
                rangeOfSentences = ["Maximum " + Math.floor(maximumMonths / 12) + " years " + maximumMonths % 12 + " months; Minimum " + minimumMonths / 12 + " years"]
            } else {
                rangeOfSentences = ["Maximum " + Math.floor(maximumMonths / 12) + " years " + maximumMonths % 12 + " months; Minimum " + Math.floor(minimumMonths / 12) + " years " + minimumMonths % 12 + " months"]
            }
        }

        rangeOfSentences.push("Maximum $" + maximumFine + " fine; Minimum $" + minimumFine + " fine")
        rangeOfSentences.push("Maximum " + maximumStrokes + " strokes; Minimum " + minimumStrokes + " strokes");
    }

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

    switch (type) {
        case "Cannabis":
        case "Diamorphine":
        case "Methamphetamine":
        case "Monoacetylmorphine":
        case "Ketamine":
        case "Opium":
        case "Phenethylamine":
        case "Cannabis mixture":
        case "Synthetic cannabinoid":
        case "Cannabinol":
        case "25B-NBOMe":
            class_of_drug = "A";
        case "Nimetazepam":
            class_of_drug = "C";
        case "MDMA":
            class_of_drug = "S";
    }

    if (statutesViolated === "5 Trafficking in controlled drugs") {
        switch (class_of_drug) {
            case "A":
                prescribedSentence = "Maximum 20 years and 15 strokes; Minimum 5 years and 5 strokes"
                if (type === "Opium" && quantity > 800) {
                    if (quantity > 1200) {
                        prescribedSentence = "Death"
                    } else {
                        prescribedSentence = "Maximum 30 years or imprisonment for life and 15 strokes; Minimum 20 years and 15 strokes"
                    }
                } else if (type === "Diamorphine" && quantity > 10) {
                    if (quantity > 15) {
                        prescribedSentence = "Death"
                    } else {
                        prescribedSentence = "Maximum 30 years or imprisonment for life and 15 strokes; Minimum 20 years and 15 strokes"
                    }
                } else if (type === "Cannabis" && quantity > 330) {
                    if (quantity > 500) {
                        prescribedSentence = "Death"
                    } else {
                        prescribedSentence = "Maximum 30 years or imprisonment for life and 15 strokes; Minimum 20 years and 15 strokes"
                    }
                } else if (type === "Cannabis mixture" && quantity > 660) {
                    if (quantity > 1000) {
                        prescribedSentence = "Death"
                    } else {
                        prescribedSentence = "Maximum 30 years or imprisonment for life and 15 strokes; Minimum 20 years and 15 strokes"
                    }
                } else if (type === "Methamphetamine" && quantity > 167) {
                    if (quantity > 250) {
                        prescribedSentence = "Death"
                    } else {
                        prescribedSentence = "Maximum 30 years or imprisonment for life and 15 strokes; Minimum 20 years and 15 strokes"
                    }
                }
            case "B":
                prescribedSentence = "Maximum 20 years and 10 strokes; Minimum 3 years and 3 strokes"
            case "C":
                prescribedSentence = "Maximum 10 years and 5 strokes; Minimum 2 years and 2 strokes"
            case "S":
            // CHECK DRUG TYPE
            // prescribedSentence = "Maximum 20 years and 15 strokes; Minimum 5 years and 5 strokes"
            default:
                prescribedSentence = "Maximum 20 years and 15 strokes; Minimum 2 years and 2 strokes"
        }
    } else if (statutesViolated === "7 Import and export of controlled drugs") {
        switch (class_of_drug) {
            case "A":
                prescribedSentence = "Maximum 30 years and 15 strokes; Minimum 5 years and 5 strokes"
                if (type === "Opium" && quantity > 800) {
                    if (quantity > 1200) {
                        prescribedSentence = "Death"
                    } else {
                        prescribedSentence = "Maximum 30 years or imprisonment for life and 15 strokes; Minimum 20 years and 15 strokes"
                    }
                } else if (type === "Diamorphine" && quantity > 10) {
                    if (quantity > 15) {
                        prescribedSentence = "Death"
                    } else {
                        prescribedSentence = "Maximum 30 years or imprisonment for life and 15 strokes; Minimum 20 years and 15 strokes"
                    }
                } else if (type === "Cannabis" && quantity > 330) {
                    if (quantity > 500) {
                        prescribedSentence = "Death"
                    } else {
                        prescribedSentence = "Maximum 30 years or imprisonment for life and 15 strokes; Minimum 20 years and 15 strokes"
                    }
                } else if (type === "Cannabis mixture" && quantity > 660) {
                    if (quantity > 1000) {
                        prescribedSentence = "Death"
                    } else {
                        prescribedSentence = "Maximum 30 years or imprisonment for life and 15 strokes; Minimum 20 years and 15 strokes"
                    }
                } else if (type === "Methamphetamine" && quantity > 167) {
                    if (quantity > 250) {
                        prescribedSentence = "Death"
                    } else {
                        prescribedSentence = "Maximum 30 years or imprisonment for life and 15 strokes; Minimum 20 years and 15 strokes"
                    }
                }
            case "B":
                prescribedSentence = "Maximum 30 years and 15 strokes; Minimum 5 years and 5 strokes"
            case "C":
                prescribedSentence = "Maximum 20 years and 15 strokes; Minimum 3 years and 5 strokes"
            case "S":
            // CHECK DRUG TYPE
            // prescribedSentence = "Maximum 20 years and 15 strokes; Minimum 5 years and 5 strokes"
            default:
                prescribedSentence = "Maximum 30 years and 15 strokes; Minimum 3 years and 5 strokes"
        }
    } else if (statutesViolated === "8 Possession of controlled drugs") {
        prescribedSentence = "Maximum 10 years or $20,000 or both; Minimum for second or subsequent offence 2 years"
    } else if (statutesViolated === "8 Consumption of controlled drugs") {
        prescribedSentence = "Maximum 10 years or $20,000 or both"
    } else if (statutesViolated === "9 Possession of pipes, utensils, etc.") {
        prescribedSentence = "Maximum 3 years or $10,000 or both"
    } else if (statutesViolated === "11A Arranging or planning gatherings where controlled drugs are to be consumed or trafficked") {
        prescribedSentence = "Maximum 20 years and 10 strokes; Minimum 3 years"
    }

    if (prescribedSentence === "Death") {
        sentencingEstimate = "Death";
    }

    res.send({
        statutesViolated: statutesViolated,
        prescribedSentence: prescribedSentence,
        rangeOfSentences: rangeOfSentences,
        similarCases: similarCases,
        sentencingEstimate: '5'
    });
})

app.listen(port, () => console.log(`Listening on port ${port}`));