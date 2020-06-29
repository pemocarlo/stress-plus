import React from "react";
import {Route, Switch} from "react-router-dom";

import Home from "components/home/home";
import TestEnd from "components/test-end/test-end";
import Editor from "editor/editor";
import PipelineExecutor from "executor/pipeline-executor";

export const VERSION = process.env.REACT_APP_VERSION;
export const BUILD_TIME = process.env.REACT_APP_BUILD_TIME;
export const IS_PRODUCTION = process.env.NODE_ENV === "production";
export const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

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
