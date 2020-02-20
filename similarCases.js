function allSimilarCasesData(cases, charge, type) {
    similarCases = [];
    minimumStrokes = Number.POSITIVE_INFINITY;
    maximumStrokes = 0;
    minimumMonths = Number.POSITIVE_INFINITY;
    maximumMonths = 0;
    minimumFine = Number.POSITIVE_INFINITY
    maximumFine = 0;
    minimumMonthsInReform = Number.POSITIVE_INFINITY;
    maximumMonthsInReform = 0;
    for (var i = 0; i < cases.length; i++) {
        if (containsCharge(cases[i], charge)) {
            if (charge == "Possession of pipes, utensils, etc." || charge == "Arranging or planning gatherings where controlled drugs are to be consumed or trafficked") {
                similarCases.push(cases[i]);

                if (cases[i].strokes_of_cane < minimumStrokes) {
                    if (!cases[i].death_penalty) {
                        minimumStrokes = cases[i].strokes_of_cane
                    }
                }
                if (cases[i].strokes_of_cane > maximumStrokes) {
                    maximumStrokes = cases[i].strokes_of_cane
                }

                if (cases[i].fine < minimumFine) {
                    if (!cases[i].death_penalty) {
                        minimumFine = cases[i].fine
                    }
                }
                if (cases[i].fine > maximumFine) {
                    maximumFine = cases[i].fine
                }

                if (numberOfMonths(cases[i]) < minimumMonths) {
                    if (!cases[i].death_penalty && !cases[i].life_imprisonment) {
                        minimumMonths = numberOfMonths(cases[i])
                    }
                }
                if (numberOfMonths(cases[i]) > maximumMonths) {
                    maximumMonths = numberOfMonths(cases[i])
                }

                if (cases[i].months_in_reformative_training < minimumMonthsInReform) {
                    if (!cases[i].death_penalty && !cases[i].life_imprisonment) {
                        minimumMonthsInReform = cases[i].months_in_reformative_training;
                    }
                }
                if (cases[i].months_in_reformative_training > maximumMonthsInReform) {
                    maximumMonthsInReform = cases[i].months_in_reformative_training;
                }

            } else if (type && containsType(cases[i], type)) {
                similarCases.push(cases[i]);

                if (cases[i].strokes_of_cane < minimumStrokes) {
                    if (!cases[i].death_penalty) {
                        minimumStrokes = cases[i].strokes_of_cane
                    }
                }
                if (cases[i].strokes_of_cane > maximumStrokes) {
                    maximumStrokes = cases[i].strokes_of_cane
                }

                if (cases[i].fine < minimumFine) {
                    if (!cases[i].death_penalty) {
                        minimumFine = cases[i].fine
                    }
                }
                if (cases[i].fine > maximumFine) {
                    maximumFine = cases[i].fine
                }

                if (numberOfMonths(cases[i]) < minimumMonths) {
                    if (!cases[i].death_penalty && !cases[i].life_imprisonment) {
                        minimumMonths = numberOfMonths(cases[i])
                    }
                }
                if (numberOfMonths(cases[i]) > maximumMonths) {
                    maximumMonths = numberOfMonths(cases[i])
                }

                if (cases[i].months_in_reformative_training < minimumMonthsInReform) {
                    if (!cases[i].death_penalty && !cases[i].life_imprisonment) {
                        minimumMonthsInReform = cases[i].months_in_reformative_training;
                    }
                }
                if (cases[i].months_in_reformative_training > maximumMonthsInReform) {
                    maximumMonthsInReform = cases[i].months_in_reformative_training;
                }
            }
        }
    }

    // console.log(similarCases.length, "similar cases found");
    result = {
        "similarCases": similarCases,
        "minimumStrokes": minimumStrokes,
        "maximumStrokes": maximumStrokes,
        "minimumMonths": minimumMonths,
        "maximumMonths": maximumMonths,
        "minimumFine": minimumFine,
        "maximumFine": maximumFine,
        "minimumMonthsInReform": minimumMonthsInReform,
        "maximumMonthsInReform": maximumMonthsInReform
    }
    return result;
}

function numberOfMonths(caseJson) {
    return 12 * caseJson.imprisonment_years + caseJson.imprisonment_months;
}

function containsCharge(caseJson, charge) {
    return caseJson.charge == charge;
}

function containsType(caseJson, type) {
    return caseJson.type == type;
}

module.exports = {
    allSimilarCasesData
}