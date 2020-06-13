import qs from "qs";
import React from "react";
import {Route, Switch, useHistory} from "react-router-dom";

import ArithmeticTest from "components/arithmetic-test/arithmetic-test";
import Settings from "components/settings/settings";
import TestEnd from "components/test-end/test-end";
import Home from "components/home/home";
import Editor from "editor/editor";
import PipelineExecutor from "executor/pipeline-executor";

export default function StressApp() {
  const history = useHistory();

  const startTest = (testConfig) => {
    const str = qs.stringify(testConfig, {allowDots: true});
    history.push(`/test?${str}`);
  };

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/settings">
        <Settings startTest={startTest} />
      </Route>
      <Route path="/test">
        <ArithmeticTest />
      </Route>
      <Route path="/end">
        <TestEnd />
      </Route>
      <Route path="/editor">
        <Editor />
      </Route>
      <Route path="/executor">
        <PipelineExecutor />
      </Route>
    </Switch>
  );
}
