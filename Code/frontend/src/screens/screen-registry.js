import React from "react";

import MathComponent from "./math/math-component";
import MessageComponent from "./message/message-component";
import MathSettings from "./math/math-settings";
import MessageSettings from "./message/message-settings";

export default {
  mathTest: {
    component: MathTestScreen,
    initialSettings: {
      title: "Math Test",
    },
    settingsComponent: MathTestScreenSettings,
  },
  message: {
    component: MessageScreen,
    initialSettings: {
      title: "Message",
    },
    settingsComponent: MessageScreenSettings,
  },
};

function MathTestScreen(props) {
  return <MathComponent {...props} />;
}

function MessageScreen(props) {
  return <MessageComponent {...props} />;
}

function MathTestScreenSettings(props) {
  return <MathSettings {...props} />;
}

function MessageScreenSettings(props) {
  return <MessageSettings {...props} />;
}
