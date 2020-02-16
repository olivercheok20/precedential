import React, { Component } from "react";

import { Container, Divider, Header } from "semantic-ui-react";
import ResearchForm from "./ResearchForm";

class Research extends Component {
    render() {
        return (
            <Container className="content">
                <Header inverted as="h1">
                    Research
                </Header>
                <Divider inverted/>
                <ResearchForm />
            </Container>
        )
    }
}

export default Research;