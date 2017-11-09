import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import LeftDrawer from "./LeftDrawer.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false
    };
    this.toggleDrawer = () => {
      this.setState(prevState => {
        return { drawerOpen: !prevState.drawerOpen };
      });
    };
  }
  render() {
    const { drawerOpen } = this.state;
    return (
      <MuiThemeProvider>
        <div className="App">
          <LeftDrawer open={drawerOpen} toggle={this.toggleDrawer} />

          <header className="App-header">
            <AppBar
              title="TP Final Matemática discreta"
              onLeftIconButtonTouchTap={this.toggleDrawer}
            />
          </header>
          <p className="App-intro" />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
