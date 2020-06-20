import React from "react";

import CurrentTime from "./current-time/current-time";
import CurrentTimeSettings from "./current-time/current-time-settings";
import ScreenFreeze from "./screen-freeze/screen-freeze";
import ScreenFreezeSetting from "./screen-freeze/screen-freeze-setting";

export default {
  currentTime: {
    component: CurrentTimeOverlay,
    initialSettings: {
      position: "center",
    },
    settingsComponent: CurrentTimeOverlaySettings,
  },
  screenFreeze: {
    component: ScreenFreezeOverlay,
    initialSettings: {
      position: "center",
      freezeStart: 10,
      freezeDisplay: 5,
    },
    settingsComponent: ScreenFreezeOverlaySettings,
  },
};

function CurrentTimeOverlay(props) {
  return <CurrentTime {...props} />;
}

function CurrentTimeOverlaySettings(props) {
  return <CurrentTimeSettings {...props} />;
}

function ScreenFreezeOverlay(props) {
  return <ScreenFreeze {...props} />;
}

function ScreenFreezeOverlaySettings(props) {
  return <ScreenFreezeSetting {...props} />;
}
