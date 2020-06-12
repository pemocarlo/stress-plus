import qs from "qs";
import React, {useState} from "react";
import {useLocation, useHistory} from "react-router-dom";

import screenRegistry from "screens/screen-registry";
import overlayRegistry from "overlays/overlay-registry";
import "./pipeline-executor.scss";

function parseQueryString(queryString) {
  return qs.parse(queryString, {allowDots: true, ignoreQueryPrefix: true});
}

function getScreenComponent(screen) {
  return screenRegistry[screen.type].component;
}

function getOverlayComponent(overlay) {
  const component = overlayRegistry[overlay.type].component;
  return component(overlay);
}

function getOverlayCssClass(overlay) {
  if (overlay.position) {
    return `overlay ${overlay.position}`;
  } else {
    return "overlay";
  }
}

export default function PipelineExecutor() {
  const [screenIndex, setScreenIndex] = useState(0);

  const location = useLocation();
  const history = useHistory();
  const settings = parseQueryString(location.search);
  const {screens, overlays} = settings;

  const onScreenFinished = () => {
    if (screens.length > screenIndex + 1) {
      setScreenIndex((i) => i + 1);
    } else {
      history.push("/end");
    }
  };

  const currentScreen = screens[screenIndex];

  const component = getScreenComponent(currentScreen);

  return (
    <div className="pipeline-executor" key={screenIndex}>
      {component({settings: currentScreen, onFinished: onScreenFinished})}
      {overlays &&
        overlays.map((overlay) => (
          <div key={overlay.id} className={getOverlayCssClass(overlay)}>
            {getOverlayComponent(overlay)}
          </div>
        ))}
    </div>
  );
}
