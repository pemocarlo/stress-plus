import CurrentTime from "./current-time/current-time";
import CurrentTimeSettings from "./current-time/current-time-settings";
import ScreenFreeze from "./screen-freeze/screen-freeze";
import ScreenFreezeSetting from "./screen-freeze/screen-freeze-setting";

export default {
  currentTime: {
    component: CurrentTime,
    initialSettings: {
      position: "center",
    },
    settingsComponent: CurrentTimeSettings,
  },
  screenFreeze: {
    component: ScreenFreeze,
    initialSettings: {
      position: "center",
      freezeStart: 10,
      freezeDisplay: 5,
    },
    settingsComponent: ScreenFreezeSetting,
  },
};
