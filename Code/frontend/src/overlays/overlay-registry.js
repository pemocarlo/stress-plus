import React from "react";
import CurrentTime from "./current-time/current-time";
import CurrentTimeSettings from "./current-time/current-time-settings";

export default {
  currentTime: {
    component: CurrentTimeOverlay,
    initialSettings: {
      position: "center",
    },
    settingsComponent: CurrentTimeOverlaySettings,
  },
};

function CurrentTimeOverlay(props) {
  return <CurrentTime {...props} />;
}

function CurrentTimeOverlaySettings(props) {
  return <CurrentTimeSettings {...props} />;
}
