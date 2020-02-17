const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/database', (req, res) => {
    const file = "./database.csv"
    res.download(file);
});

app.get('/resources', (req, res) => {
    const file = "./resources.pdf"
    res.download(file);
});

app.listen(port, () => console.log(`Listening on port ${port}`));