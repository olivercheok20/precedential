function allSimilarCasesData(cases, charge, type) {
    similarCases = [];
    minimumStrokes = Number.POSITIVE_INFINITY;
    maximumStrokes = 0;
    minimumMonths = Number.POSITIVE_INFINITY;
    maximumMonths = 0;
    minimumFine = Number.POSITIVE_INFINITY
    maximumFine = 0;
    for (var i = 0; i < cases.length; i++) {
        if (containsCharge(cases[i], charge)) {
            if (charge === "Possession of pipes, utensils, etc." || charge === "Arranging or planning gatherings where controlled drugs are to be consumed or trafficked") {
                similarCases.push(cases[i]);

                if (cases[i].strokes_of_cane < minimumStrokes) {
                    minimumStrokes = cases[i].strokes_of_cane
                } else if (cases[i].strokes_of_cane > maximumStrokes) {
                    maximumStrokes = cases[i].strokes_of_cane
                }

                if (cases[i].fine < minimumFine) {
                    minimumFine = cases[i].fine
                } else if (cases[i].fine > maximumFine) {
                    maximumFine = cases[i].fine
                }

                if (numberOfMonths(cases[i]) < minimumMonths) {
                    minimumMonths = numberOfMonths(cases[i])
                } else if (numberOfMonths(cases[i]) > maximumMonths) {
                    maximumMonths = numberOfMonths(cases[i])
                }

            } else if (type && containsType(cases[i], type)) {
                similarCases.push(cases[i]);

                if (cases[i].strokes_of_cane < minimumStrokes) {
                    minimumStrokes = cases[i].strokes_of_cane
                } else if (cases[i].strokes_of_cane > maximumStrokes) {
                    maximumStrokes = cases[i].strokes_of_cane
                }

                if (cases[i].fine < minimumFine) {
                    minimumFine = cases[i].fine
                } else if (cases[i].fine > maximumFine) {
                    maximumFine = cases[i].fine
                }

                if (numberOfMonths(cases[i]) < minimumMonths) {
                    minimumMonths = numberOfMonths(cases[i])
                } else if (numberOfMonths(cases[i]) > maximumMonths) {
                    maximumMonths = numberOfMonths(cases[i])
                }

            } else {
                similarCases.push(cases[i]);

                if (cases[i].strokes_of_cane < minimumStrokes) {
                    minimumStrokes = cases[i].strokes_of_cane
                } else if (cases[i].strokes_of_cane > maximumStrokes) {
                    maximumStrokes = cases[i].strokes_of_cane
                }

                if (cases[i].fine < minimumFine) {
                    minimumFine = cases[i].fine
                } else if (cases[i].fine > maximumFine) {
                    maximumFine = cases[i].fine
                }

                if (numberOfMonths(cases[i]) < minimumMonths) {
                    minimumMonths = numberOfMonths(cases[i])
                } else if (numberOfMonths(cases[i]) > maximumMonths) {
                    maximumMonths = numberOfMonths(cases[i])
                }
            }
        }
    }
    console.log(similarCases.length, "similar cases found");
    result = {
        "similarCases": similarCases,
        "minimumStrokes" : minimumStrokes,
        "maximumStrokes" : maximumStrokes,
        "minimumMonths" : minimumMonths,
        "maximumMonths" : maximumMonths,
        "minimumFine" : minimumFine,
        "maximumFine" : maximumFine
    }
    return result;
}

function numberOfMonths(caseJson) {
    return 12 * caseJson.imprisonment_years + caseJson.imprisonment_months;
}

function containsCharge(caseJson, charge) {
    return caseJson.charge === charge;
}

function containsType(caseJson, type) {
    return caseJson.type === type;
}

module.exports = {
    allSimilarCasesData
}