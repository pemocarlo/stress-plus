import MyChatBot from "./chatbot/chatbot";
import MyChatBotSettings from "./chatbot/chatbot-settings";
import DefaultStart from "./default-start/default-start";
import DefaultStartSettings from "./default-start/default-start-settings";
import End from "./end/end";
import EndSettings from "./end/end-settings";
import ArithmeticTest from "./math/arithmetic-test";
import MathSettings from "./math/math-settings";
import MessageComponent from "./message/message-component";
import MessageSettings from "./message/message-settings";
import iFrameSurveySettings from "./survey/survey-settings.js";
import iFrameSurvey from "./survey/survey.js";
import WaitingComponent from "./waiting-screen/waiting-component";
import WaitingSettings from "./waiting-screen/waiting-settings";

export default {
  mathTest: {
    component: ArithmeticTest,
    initialSettings: {
      title: "Math Test",
      answerTimeout: 5, //in seconds
      waitTime: 2, // in seconds
      testTotalTime: 10, // in seconds
      enableSound: false,
      isControl: false,
      difficulty: 0,
    },
    settingsComponent: MathSettings,
  },

  message: {
    component: MessageComponent,
    initialSettings: {
      title: "Message",
      message: "",
      buttonText: "Next",
    },
    settingsComponent: MessageSettings,
  },

  waiting: {
    component: WaitingComponent,
    initialSettings: {
      title: "Connecting...",
      message: "Please wait until the host lets you in!",
      wait_time: 5,
    },
    settingsComponent: WaitingSettings,
  },

  chatbot: {
    component: MyChatBot,
    initialSettings: {
      messageCount: 1,
      message1: "Welcome to Stress+",
    },
    settingsComponent: MyChatBotSettings,
  },

  start: {
    component: DefaultStart,
    initialSettings: {
      message: "Don't disappoint us",
    },
    settingsComponent: DefaultStartSettings,
  },

  end: {
    component: End,
    initialSettings: {
      message: "We will now analyze your results",
    },
    settingsComponent: EndSettings,
  },

  survey: {
    component: iFrameSurvey,
    initialSettings: {
      title: "https://www.mad.tf.fau.de/teaching/innolab/",
      buttonText: "Next",
    },
    settingsComponent: iFrameSurveySettings,
  },
};
