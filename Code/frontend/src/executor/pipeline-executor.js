import qs from "qs";
import React, {useState, useCallback, useMemo} from "react";
import {useLocation} from "react-router-dom";

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
  return overlayRegistry[overlay.type].component;
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
  const settings = useMemo(() => parseQueryString(location.search), [location.search]);
  const {screens, overlays} = settings;
  const screenCount = screens.length;

  const onScreenFinished = useCallback(() => {
    if (screenCount > screenIndex + 1) {
      setScreenIndex((i) => i + 1);
    } else {
      window.location.href = "about:blank";
    }
  }, [setScreenIndex, screenIndex, screenCount]);

  const currentScreen = screens[screenIndex];

  const ScreenComponent = getScreenComponent(currentScreen);

  return (
    <div className="pipeline-executor">
      <ScreenComponent key={screenIndex} settings={currentScreen} onFinished={onScreenFinished} />
      {overlays && overlays.map((overlay) => <OverlayContainer key={overlay.id} {...overlay} />)}
    </div>
  );
}

function OverlayContainer(props) {
  const OverlayComponent = getOverlayComponent(props);
  return (
    <div className={getOverlayCssClass(props)}>
      <OverlayComponent {...props} />
    </div>
  );
}
