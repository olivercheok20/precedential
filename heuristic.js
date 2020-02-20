function heuristic(caseJson, quantity, keywords) {

    score = null;

    if ((quantity == 'null') || (quantity == 0) || (Number.isNaN(caseJson.quantity)) || (caseJson.quantity == 0)) {
        score = 1;
    } else {
        absoluteQuantityDifference = Math.abs(caseJson.quantity - quantity) / quantity
        score = Math.exp(-1 * absoluteQuantityDifference)
    }

    for (var i = 0; i < keywords.length; i++) {
        if (caseJson.keywords.includes(keywords[i])) {
            score *= 3;
        }
    }
    return score;
}

function compareHelper(caseOne, caseTwo, quantity, keywords) {
    caseOneHeuristic = heuristic(caseOne, quantity, keywords)
    caseTwoHeuristic = heuristic(caseTwo, quantity, keywords)
    return caseTwoHeuristic - caseOneHeuristic;
}

function sortByHeuristic(cases, quantity, keywords) {
    const compare = (caseOne, caseTwo) => {
        return compareHelper(caseOne, caseTwo, quantity, keywords);
    }
    return cases.slice().sort(compare)
}

module.exports = {
    compareHelper,
    heuristic,
    sortByHeuristic
}