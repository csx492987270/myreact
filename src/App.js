import React, { useState } from 'react';
import './App.css';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import routes from './routes';
const App = () => {
  const [logo] = useState(logo);
  return (
    <div className="App">
      <Router>
        <Switch>
            {
              routes.map((route, index) => {
                const {
                  path,
                  exact,
                  layout = 'default',
                  component: Component
                } = route;
                return (
                  <Route
                    key={index}
                    path={path}
                    exact={exact}
                    render={props => {
                      return (
                        <Component {...props} />
                      )
                    }}
                  />
                );
              })
            }
          }
        </Switch>
      </Router>
    </div>
  );
}

export default App;
