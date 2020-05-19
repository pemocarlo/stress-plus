import React from "react";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";

import ArithmeticTest from "components/ArithmeticTest/ArithmeticTest";
import "./stress-app.css";

const props = {seconds: 3};

export default function StressApp() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <h1>Hallo Mist Test</h1>
          <Link to="/mist-test">Start test</Link>
        </Route>
        <Route path="/mist-test">
          <ArithmeticTest {...props}/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
