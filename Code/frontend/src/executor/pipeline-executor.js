import qs from "qs";
import {useState} from "react";
import {useLocation, useHistory} from "react-router-dom";

import screenRegistry from "screens/screen-registry";

function parseQueryString(queryString) {
  return qs.parse(queryString, {allowDots: true, ignoreQueryPrefix: true});
}

function getScreenComponent(screen) {
  return screenRegistry[screen.type].component;
}

export default function PipelineExecutor() {
  const [screenIndex, setScreenIndex] = useState(0);

  const location = useLocation();
  const history = useHistory();
  const settings = parseQueryString(location.search);
  const {screens} = settings;

  const onScreenFinished = () => {
    if (screens.length > screenIndex + 1) {
      setScreenIndex((i) => i + 1);
    } else {
      history.push("/end");
    }
  };

  const currentScreen = screens[screenIndex];

  const component = getScreenComponent(currentScreen);

  return component({settings: currentScreen, onFinished: onScreenFinished});
}
