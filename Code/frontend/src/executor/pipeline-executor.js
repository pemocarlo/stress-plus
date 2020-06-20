import qs from "qs";
import React, {useState, useCallback} from "react";
import {useLocation, useHistory} from "react-router-dom";

import overlayRegistry from "overlays/overlay-registry";
import screenRegistry from "screens/screen-registry";
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
  const screenCount = screens.length;

  const onScreenFinished = useCallback(() => {
    setScreenIndex((index) => {
      if (screenCount > index + 1) {
        return index + 1;
      } else {
        history.push("/end");
        return index;
      }
    });
  }, [setScreenIndex, screenCount, history]);

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
