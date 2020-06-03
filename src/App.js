import React, { Component } from "react";

import "semantic-ui-css/semantic.min.css";

import { Grid, Segment, Modal, Button, Icon } from "semantic-ui-react";
import NavigationMenu from "./common/NavigationMenu";
import Home from "./home/Home";
import Research from "./research/Research";
import Database from "./database/Database";
import Resources from "./resources/Resources";
import Footer from "./common/Footer";


import "./App.css";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      home: true,
      research: false,
      database: false,
      resources: false,
      modalOpen: true
    };
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  goToHome() {
    this.setState({
      home: true,
      research: false,
      database: false,
      resources: false
    })
  }

  goToResearch() {
    this.setState({
      home: false,
      research: true,
      database: false,
      resources: false
    })
  }

  goToDatabase() {
    this.setState({
      home: false,
      research: false,
      database: true,
      resources: false
    })
  }

  goToResources() {
    this.setState({
      home: false,
      research: false,
      database: false,
      resources: true
    })
  }

  handleCloseModal() {
    this.setState({ 
      modalOpen: false 
    })
  }

  render() {
    return (
      <div className="App">
        <Modal
          id="disclaimer"
          defaultOpen
          open={this.state.modalOpen}
          >
          <Modal.Header as="h1">Legal Disclaimer</Modal.Header>
          <Modal.Content>
            <p>The information provided on this website does not, and is not intended to, constitute legal advice; instead, all information, content, and materials available on this site are for general informational purposes only.</p>
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' onClick={this.handleCloseModal}>
              <Icon name='checkmark' /> I understand
            </Button>
          </Modal.Actions>
        </Modal>
        <Segment inverted vertical textAlign="center">
          <Grid style={{ height: "100%" }}>
            <Grid.Row width={16} style={{ height: "10vh" }}>
              <NavigationMenu
                appState={this.state}
                goToHome={this.goToHome.bind(this)}
                goToResearch={this.goToResearch.bind(this)}
                goToDatabase={this.goToDatabase.bind(this)}
                goToResources={this.goToResources.bind(this)}
              />
            </Grid.Row>
            <Grid.Row width={16} style={{ height: "auto" }}>
              {this.state.home && <Home goToResearch={this.goToResearch.bind(this)} />}
              {this.state.research && <Research />}
              {this.state.database && <Database />}
              {this.state.resources && <Resources />}
            </Grid.Row>
          </Grid>
          <Footer />
        </Segment>
      </div>
    );
  }
}

export default App;
