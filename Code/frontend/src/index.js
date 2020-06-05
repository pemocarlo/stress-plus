import React, {Suspense} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";

import {library} from "@fortawesome/fontawesome-svg-core";
import {faCog} from "@fortawesome/free-solid-svg-icons";

import "./index.scss";
import StressApp from "./stress-app";
import * as serviceWorker from "./service-worker";
import "./i18n";

function LoadingComponent() {
  return <div>Loading...</div>;
}

// The Suspense component is needed to wait for the languages being loaded in the background
ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<LoadingComponent />}>
      <BrowserRouter>
        <StressApp />
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);

library.add(faCog);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
