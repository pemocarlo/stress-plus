import React from "react";

import MathComponent from "./math/math-component";
import MessageComponent from "./message/message-component";

export default {
  mathTest: {
    component: MathTestScreen,
    initialSettings: {
      title: "Math Test",
    },
  },
  message: {
    component: MessageScreen,
    initialSettings: {
      title: "Message",
    },
  },
};

function MathTestScreen(props) {
  return <MathComponent {...props} />;
}

function MessageScreen(props) {
  return <MessageComponent {...props} />;
}
