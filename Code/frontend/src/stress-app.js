import React from "react";
import {Route, Switch, useHistory} from "react-router-dom";

import ArithmeticTest from "components/ArithmeticTest/ArithmeticTest";
import Settings from "components/settings/settings";
import "./stress-app.css";

const props = {seconds: 3};

export default function StressApp() {
  const history = useHistory();

  const startTest = (testConfig) => {
    history.push('/test', testConfig);
  };

  return (
<<<<<<< HEAD
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
=======
    <Switch>
      <Route exact path="/">
        <Settings startTest={startTest} />
      </Route>
      <Route path="/test">
        <ArithmeticTest />
      </Route>
    </Switch>
>>>>>>> 2b74a28... Add simple settings page
  );
}
