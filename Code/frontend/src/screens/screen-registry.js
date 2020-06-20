import React from "react";

import ArithmeticTest from "./math/arithmetic-test";
import MathSettings from "./math/math-settings";
import MessageComponent from "./message/message-component";
import MessageSettings from "./message/message-settings";
import WaitingComponent from "./waiting-screen/waiting-component";
import WaitingSettings from "./waiting-screen/waiting-settings";

export default {
  mathTest: {
    component: ArithmeticTestScreen,
    initialSettings: {
      title: "Math Test",
      answerTimeout: 5, //in seconds
      waitTime: 2, // in seconds
      testTotalTime: 10, // in seconds
      enableSound: false,
      isControl: false,
      difficulty: 0,
    },
    settingsComponent: MathTestScreenSettings,
  },

  message: {
    component: MessageScreen,
    initialSettings: {
      title: "Message",
      message: "",
      buttonText: "Next",
    },
    settingsComponent: MessageScreenSettings,
  },

  waiting: {
    component: WaitingScreen,
    initialSettings: {
      title: "Connecting...",
      message: "Please wait until the host lets you in!",
      wait_time: 5,
    },
    settingsComponent: WaitingScreenSettings,
  },
};

function ArithmeticTestScreen(props) {
  return <ArithmeticTest {...props} />;
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

function WaitingScreen(props) {
  return <WaitingComponent {...props} />;
}

function WaitingScreenSettings(props) {
  return <WaitingSettings {...props} />;
}
