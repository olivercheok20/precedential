function allSimilarCases(cases, charge, type) {
    similarCases = [];
    for (var i = 0; i < cases.length; i++) {
        if (containsCharge(cases[i], charge)) {
            if (charge === "Possession of pipes, utensils, etc." || charge === "Arranging or planning gatherings where controlled drugs are to be consumed or trafficked") {
                similarCases.push(cases[i]);
            } else if (type && containsType(cases[i], type)){
                similarCases.push(cases[i]);
            } else {
                similarCases.push(cases[i]);
            }
        }
    }
    console.log(similarCases.length, "similar cases found");
    return similarCases;
}

function containsCharge(caseJson, charge) {
    return caseJson.charge === charge;
}

function containsType(caseJson, type) {
    return caseJson.type === type;
}

module.exports = {
    allSimilarCases
}