import React, { Component } from "react";

class CaseList extends Component {

    caseToSentence(caseJson) {
        if (caseJson.death_penalty) {
            return "Death penalty"
        } else if (caseJson.life_imprisonment) {
            if (caseJson.strokes_of_cane) {
                if (caseJson.fine) {
                    return "Life imprisonment, $" + caseJson.fine + "fine and " + caseJson.strokes_of_cane + " strokes"
                } else {
                    return "Life imprisonment and " + caseJson.strokes_of_cane + " strokes"
                }
            } else {
                return "Life imprisonment"
            }
        } else if (caseJson.months_in_reformative_training > 0) {
            return caseJson.months_in_reformative_training + " months in reformative training";
        } else {
            if (caseJson.strokes_of_cane) {
                if (caseJson.fine) {
                    return caseJson.imprisonment_years + " years, " + caseJson.imprisonment_months + " months, " + caseJson.imprisonment_days + " days, $" + caseJson.fine + "fine and " + caseJson.strokes_of_cane + " strokes"
                } else {
                    return caseJson.imprisonment_years + " years, " + caseJson.imprisonment_months + " months, " + caseJson.imprisonment_days + " days and " + caseJson.strokes_of_cane + " strokes"
                }
            } else {
                return caseJson.imprisonment_years + " years, " + caseJson.imprisonment_months + " months, " + caseJson.imprisonment_days + " days"
            }
        }
    }


    render() {
        return (
            <ol>
                {this.props.similarCases.map((caseJson, index) => {
                    return (
                        <li key={index}>
                            {caseJson.case_name}
                            <ul>
                                <li>{caseJson.charge}</li>
                                {
                                    ((caseJson.charge !== "Possession of pipes, utensils, etc.") && (caseJson.charge !== "Arranging or planning gatherings where controlled drugs are to be consumed or trafficked")) &&
                                    <li>{caseJson.type}</li>
                                }
                                {
                                    (caseJson.charge === "Trafficking in controlled drugs" ||
                                        caseJson.charge === "Possession of controlled drugs" ||
                                        caseJson.charge === "Import and export of controlled drugs") &&
                                    <li> {caseJson.quantity}g</li>
                                }
                                <li>{this.caseToSentence(caseJson)}</li>
                                {
                                    caseJson.keywords.length > 0 &&
                                    <li>{
                                        caseJson.keywords[0]
                                            .charAt(0)
                                            .toUpperCase()
                                        + caseJson.keywords.join(", ").slice(1)
                                    }</li>
                                }
                            </ul>
                        </li>
                    )
                })
                }
            </ol >
        )
    }
}

export default CaseList;