import React from "react";
import MessageComponent from "./message/message-component";
import ArithmeticTest from "./math/arithmetic-test";
import MathSettings from "./math/math-settings";
import MessageSettings from "./message/message-settings";

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
