import React, { Component } from "react";

import "semantic-ui-css/semantic.min.css";

import { Grid, Segment } from "semantic-ui-react";
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
      resources: false
    };
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

  render() {
    return (
      <div className="App">
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
          <Footer/>
        </Segment>
      </div>
    );
  }
}

export default App;
