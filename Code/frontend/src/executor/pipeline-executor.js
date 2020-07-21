import axios from "axios";
import qs from "qs";
import React, {useState, useCallback, useEffect, useRef} from "react";
import {useLocation, useParams} from "react-router-dom";

import ErrorComponent from "components/error-component/error-component";
import LoadingComponent from "components/loading/loading";
import overlayRegistry from "overlays/overlay-registry";
import screenRegistry from "screens/screen-registry";
import useInterval from "services/use-interval";

import {useStatsCollector} from "./stats-collector";
import "./pipeline-executor.scss";

function parseQueryString(queryString) {
  return qs.parse(queryString, {ignoreQueryPrefix: true});
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

function getRecordCursorPosition(coord) {
  return {
    timestamp: new Date(),
    statisticType: "cursor",
    position: coord,
  };
}

export default function PipelineExecutor() {
  const [screenIndex, setScreenIndex] = useState(0);
  const [settings, setSettings] = useState(null);
  const [error, setError] = useState(null);
  const cursorCoords = useRef({x: 0, y: 0});
  const location = useLocation();
  const {testId} = useParams();
  const statsCollector = useStatsCollector(testId);

  useEffect(() => {
    axios
      .get(`/api/stress-test/${testId}`)
      .then((response) => {
        setSettings(response.data);
        statsCollector.current.initStats(parseQueryString(location.search));
        setError(null);
      })
      .catch((err) => {
        setError(err);
      });
  }, [location, testId, statsCollector]);

  const handler = useCallback(({clientX, clientY}) => {
    cursorCoords.current = {x: clientX, y: clientY};
  }, []);

  useInterval(() => {
    statsCollector.current.addRecord(getRecordCursorPosition(cursorCoords.current));
  }, 1000);

  const onScreenFinished = useCallback(() => {
    if (settings.screens.length > screenIndex + 1) {
      statsCollector.current.saveStats(settings.screens[screenIndex]);
      setScreenIndex((i) => i + 1);
    } else {
      statsCollector.current.saveStats(settings.screens[screenIndex], () => {
        window.location.href = "about:blank";
      });
    }
  }, [screenIndex, settings, statsCollector]);

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
    <div className="pipeline-executor" onMouseMove={handler}>
      <ScreenComponent
        key={screenIndex}
        settings={currentScreen}
        onFinished={onScreenFinished}
        saveRecord={statsCollector.current.addRecord}
      />

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
