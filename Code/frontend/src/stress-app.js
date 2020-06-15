import React from "react";
import {Route, Switch} from "react-router-dom";

import Home from "components/home/home";
import TestEnd from "components/test-end/test-end";
import Editor from "editor/editor";
import PipelineExecutor from "executor/pipeline-executor";

export default function StressApp() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
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
