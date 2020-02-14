import React, { Component } from "react";

import { Segment } from "semantic-ui-react";

class Footer extends Component {
    render() {
        return (
            <Segment inverted vertical as="footer">
            Created by USPenguins as part of the{" "}
            <a href="http://www.altlaw.xyz/nus-legal-technology-competition">
              Alt Law NUS Legal Technology Competition 2019/20
            </a>
            .
            </Segment>
        )
    }
}

export default Footer;