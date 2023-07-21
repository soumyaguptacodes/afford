import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import AllTrains from "./AllTrains";
import SingleTrain from "./SingleTrain";

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">All Trains</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/" component={AllTrains} />
          <Route path="/train/:trainId" component={SingleTrain} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
