import axios from "axios";
import React, {useState, useCallback, useEffect} from "react";
import {useParams} from "react-router-dom";

import ErrorComponent from "components/error-component/error-component";
import LoadingComponent from "components/loading/loading";
import overlayRegistry from "overlays/overlay-registry";
import screenRegistry from "screens/screen-registry";
import "./pipeline-executor.scss";

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
  const [settings, setSettings] = useState(null);
  const [error, setError] = useState(null);

  const {testId} = useParams();

  useEffect(() => {
    axios
      .get(`/api/stress-test/${testId}`)
      .then((response) => {
        setSettings(response.data);
        setError(null);
      })
      .catch((err) => {
        setError(err);
      });
  }, [testId]);

  const onScreenFinished = useCallback(() => {
    if (settings.screens.length > screenIndex + 1) {
      setScreenIndex((i) => i + 1);
    } else {
      window.location.href = "about:blank";
    }
  }, [setScreenIndex, screenIndex, settings]);

  if (error !== null) {
    return <ErrorComponent>{error.message}</ErrorComponent>;
  }

  if (settings === null) {
    return <LoadingComponent />;
  }

  const {screens, overlays} = settings;
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
