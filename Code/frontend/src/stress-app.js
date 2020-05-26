import React from "react";
import {Route, Switch, useHistory} from "react-router-dom";

import ArithmeticTest from "components/arithmetic-test/arithmetic-test";
import Settings from "components/settings/settings";
import "./stress-app.css";

export default function StressApp() {
  const history = useHistory();

  const startTest = (testConfig) => {
    history.push("/test", testConfig);
  };

  return (
    <Switch>
      <Route exact path="/">
        <Settings startTest={startTest} />
      </Route>
      <Route path="/test">
        <ArithmeticTest />
      </Route>
    </Switch>
  );
}
