import React, {Component} from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import LeftDrawer from './LeftDrawer.js';

import Routes from './Routes.js';
import ExerciseTemplate from './Components/ExerciseTemplate.js';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
    };
    this.routes = Routes;
    this.toggleDrawer = () => {
      this.setState(prevState => {
        return {drawerOpen: !prevState.drawerOpen};
      });
    };
  }
  render() {
    const {routes} = this;
    const {drawerOpen} = this.state;
    return (
      <MuiThemeProvider>
        <div className="App">
          <Router>
            <div>
              <LeftDrawer
                routes={routes}
                open={drawerOpen}
                toggle={this.toggleDrawer}
              />
              <header className="App-header">
                <AppBar
                  title="TP Final Matemática discreta"
                  onLeftIconButtonTouchTap={this.toggleDrawer}
                />
              </header>
              <div className="content">
                {this.routes.map(r => (
                  <Route
                    key={r.name}
                    path={`${r.path}`}
                    render={() => <ExerciseTemplate exercise={r} />}
                  />
                ))}
              </div>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
