import {library} from "@fortawesome/fontawesome-svg-core";
import {
  faClipboardList,
  faCog,
  faCopy,
  faEdit,
  faEnvelope,
  faFileDownload,
  faLink,
  faList,
  faPlay,
  faPlus,
  faQuestion,
  faSave,
  faTools,
  faTrash,
  faIdBadge,
} from "@fortawesome/free-solid-svg-icons";
import React, {Suspense} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";

import LoadingComponent from "components/loading/loading";

import * as serviceWorker from "./service-worker";
import StressApp from "./stress-app";
import "./i18n";
import "./index.scss";

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

library.add(
  faClipboardList,
  faCog,
  faCopy,
  faEdit,
  faEnvelope,
  faFileDownload,
  faLink,
  faList,
  faPlay,
  faPlus,
  faQuestion,
  faSave,
  faTools,
  faTrash,
  faIdBadge
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
