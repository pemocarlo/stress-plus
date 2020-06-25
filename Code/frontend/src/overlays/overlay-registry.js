import MyChatBot from "./chatbot/chatbot";
import MyChatBotSettings from "./chatbot/chatbot-settings";
import CurrentTime from "./current-time/current-time";
import CurrentTimeSettings from "./current-time/current-time-settings";
import ScreenFreeze from "./screen-freeze/screen-freeze";
import ScreenFreezeSetting from "./screen-freeze/screen-freeze-setting";
import WebcamOverlay from "./webcam/webcam-overlay";
import WebcamOverlaySettings from "./webcam/webcam-overlay-settings";

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
  webcam: {
    component: WebcamOverlay,
    initialSettings: {
      position: "bottom-left",
    },
    settingsComponent: WebcamOverlaySettings,
  },
  chatbot: {
    component: MyChatBot,
    initialSettings: {
      startTime: 5,
    },
    settingsComponent: MyChatBotSettings,
  },
};
