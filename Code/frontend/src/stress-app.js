import qs from "qs";
import React from "react";
import {Route, Switch, useHistory} from "react-router-dom";

import ArithmeticTest from "components/arithmetic-test/arithmetic-test";
import Settings from "components/settings/settings";
import TestEnd from "components/test-end/test-end";
import "./stress-app.css";

export default function StressApp() {
  const history = useHistory();

  const startTest = (testConfig) => {
    const str = qs.stringify(testConfig, {allowDots: true});
    history.push(`/test?${str}`);
  };

  return (
    <Switch>
      <Route exact path="/">
        <Settings startTest={startTest} />
      </Route>
      <Route path="/test">
        <ArithmeticTest />
      </Route>
      <Route path="/end">
        <TestEnd />
      </Route>
    </Switch>
  );
}
